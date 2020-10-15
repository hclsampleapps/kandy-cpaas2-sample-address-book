/**
 * CPaaS Authentication Demo
 */
var changeView;
var showhideView;
var serverBase;
var mHostUrl;
var client;
const tokenAPI = '/cpaas/auth/v1/token'

whenReady(function() {
    Notification.initialize();
    changeView = new ChangeView();
    changeView.showDirectoryView();
    changeView.showPasswordGrant();
});

class Notification {
    static initialize(el) {
        this.container = document.querySelector('.notification');
        this.close = document.querySelector('.notification .close');
        this.close.addEventListener('click', e => this.container.classList.add('hide'));
    }
}

class ChangeView {
    constructor() {
        this.directoryView = document.getElementById('directoryView');
        this.addressBookView = document.getElementById('addressBookView');

        this.accountPasswordGrantView = document.getElementById('passwordID');
        this.accountClientCredentialsView = document.getElementById('clientCredID');

        this.accountPasswordGrantradio = document.getElementById('passwordGrant');
        this.accountPasswordGrantradio.addEventListener('click', (evt) => this.showPasswordGrant(evt));

        this.accountClientCredentialsradio = document.getElementById('clientCred');
        this.accountClientCredentialsradio.addEventListener('click', (evt) => this.showClientCredentials(evt));

        this.directoryRadio = document.getElementById('directory');
        this.directoryRadio.addEventListener('click', (evt) => this.showDirectoryView(evt));

        this.addressBookRadio = document.getElementById('addressBook');
        this.addressBookRadio.addEventListener('click', (evt) => this.showAddressBookView(evt));
    }

    showPasswordGrant() {
        Effect.hide(this.accountClientCredentialsView);
        Effect.show(this.accountPasswordGrantView);
    }

    showClientCredentials() {
        Effect.show(this.accountClientCredentialsView);
        Effect.hide(this.accountPasswordGrantView);
    }
    showDirectoryView() {
        Effect.hide(this.addressBookView);
        Effect.show(this.directoryView);
    }

    showAddressBookView() {
        Effect.hide(this.directoryView);
        Effect.show(this.addressBookView);
    }
}

function initClient() {
    let mServerUrl = document.getElementById("serverUrl").value;
    mHostUrl = new URL(mServerUrl).host;
    console.log(mHostUrl);
    client = Kandy.create({
        subscription: {
            expires: 3600
        },
        // Required: Server connection configs.
        authentication: {
            server: {
                base: mHostUrl
            },
            clientCorrelator: 'sampleCorrelator'
        }
    })

    // Assign callback functions to address book events
    client.on('contacts:change', () => {
        updateContactsList()
    })

    client.on('contacts:new', contact => {
        updateContactsList()
    })

    // Assign functions to receive directory events
    client.on('directory:change', () => {
        updateUserList()
    })

    // Assign functions to receive directory-related error events
    client.on('directory:error', error => {
        const logMessage = 'An error occured: ' + error
        log(logMessage)
    })
}

/**
 * Creates a form body from an dictionary
 */
function createFormBody(paramsObject) {
    const keyValuePairs = Object.entries(paramsObject).map(
        ([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)
    )
    return keyValuePairs.join('&')
}

/**
 * Gets the tokens necessary for authentication to CPaaS
 */
async function getTokensByPasswordGrant({
    clientId,
    username,
    password
}) {
    const cpaasAuthUrl = constructServerUrl();
    const formBody = createFormBody({
        client_id: clientId,
        username,
        password,
        grant_type: 'password',
        scope: 'openid'
    })
    // POST a request to create a new authentication access token.
    const fetchResult = await fetch(cpaasAuthUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    })
    // Parse the result of the fetch as a JSON format.
    const data = await fetchResult.json()
    return {
        accessToken: data.access_token,
        idToken: data.id_token,
        expiresIn: data.expires_in
    }
}
async function loginByPasswordGrant() {
    initClient();
    const clientId = document.getElementById('clientId').value
    const userEmail = document.getElementById('userEmail').value
    const password = document.getElementById('password').value
    try {
        const tokens = await getTokensByPasswordGrant({
            clientId,
            username: userEmail,
            password
        })

        log('Successfully logged in as ' + userEmail + '. Your access token will expire in ' + tokens.expiresIn/60 + ' minutes')

        client.setTokens(tokens)

    } catch (error) {
        log('Error: Failed to get authentication tokens. Error: ' + error)
    }
}

async function getTokensByClientCredGrant({
    client_id,
    client_secret
}) {

    const cpaasAuthUrl = constructServerUrl();
    const formBody = createFormBody({
        client_id,
        client_secret,
        grant_type: 'client_credentials',
        scope: 'openid regular_call'
    })

    // POST a request to create a new authentication access token.
    const fetchResult = await fetch(cpaasAuthUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    })
    // Parse the result of the fetch as a JSON format.
    const data = await fetchResult.json();

    return {
        accessToken: data.access_token,
        idToken: data.id_token,
        expiresIn: data.expires_in
    }
}

async function loginByClientCred() {
    initClient();
    const privateKey = document.getElementById('privateKey').value
    const privateSecret = document.getElementById('privateSecret').value

    try {
        const tokens = await getTokensByClientCredGrant({
            client_id: privateKey,
            client_secret: privateSecret
        })
        client.setTokens(tokens)
        log('Successfully logged in with project User ' + privateKey)
    } catch (error) {
        log('Error: Failed to get authentication tokens. Error: ' + error)
    }
}

function constructServerUrl() {
    let cpaasUrl;
    let enteredBaseUrl = document.getElementById("serverUrl").value
    if (enteredBaseUrl.trim() !== "") {
        serverBase = enteredBaseUrl.trim()
    }
    cpaasUrl = serverBase + tokenAPI
    return cpaasUrl;
}

/**
 * Address Book functions
 **/
// Add a contact to the Address Book
function addContact() {
    let contact = getContactFormData()
    if (!contact.contactId) {
        log('Cannot add a contact to the Address Book without a contact ID!')
    } else {
        client.contacts.add(getContactFormData())
    }
}

// Remove a contact from the Address Book
function removeContact() {
    let contactId = getSelectedContactId()
    client.contacts.remove(contactId)
}

// Update the details of a contact in the Address Book
function updateContact() {
    const contact = getContactFormData()
    if (!contact.contactId) {
        log('Cannot update a contact with no contact ID!')
    } else {
        client.contacts.update(contact.contactId, contact)
    }
}

// Retrieve all contacts from the Address Book
function refreshContacts() {
    client.contacts.refresh()
}

// Clear all input fields from Address Book
function clearContact() {
    document.getElementById('id').value = "";
    document.getElementById('primary-contact').value = "";
    document.getElementById('firstN').value = "";
    document.getElementById('lastN').value = "";
    document.getElementById('emailN').value = "";
    document.getElementById('home-phone').value = "";
    document.getElementById('business-phone').value = "";
}

// Clear all input fields from Directory
function clearContactForm() {
    document.getElementById('user-id').value = "";
    document.getElementById('filter-value').value = "";
}

// Get data from the contact form
function getContactFormData() {
    const contactId = document.getElementById('id').value
    const primaryContact = document.getElementById('primary-contact').value
    const firstName = document.getElementById('firstN').value
    const lastName = document.getElementById('lastN').value
    const emailAddress = document.getElementById('emailN').value
    const homePhoneNumber = document.getElementById('home-phone').value
    const businessPhoneNumber = document.getElementById('business-phone').value
    const buddy = document.getElementById('buddy').checked

    return { contactId, primaryContact, firstName, lastName, emailAddress, homePhoneNumber, businessPhoneNumber, buddy }
}




// Helper function to update the contacts select list
function updateUserList() {
    const select = document.getElementById('userDropDown')
    select.innerHTML = ''
    const users = client.user.getAll()
    for (const user of users) {
      for (let opt of select.options) {
        if (opt.value === user.userId) {
          select.removeChild(opt)
        }
      }
      var opt = document.createElement('option')
      opt.value = opt.text = user.userId
      select.appendChild(opt)
      if (select.options.length === 1) {
        renderUser()
      }
    }
  }

  // Helper function to render a user and update the user display
function renderUser(id) {
    const userId = id || getSelectedUser()
    console.log('Rendering user')
    if (userId) {
      const user = client.user.get(userId)
      const userDataString = JSON.stringify(user, null, 4)
      document.getElementById('display').innerHTML = userDataString
      if (user != undefined && user != "") {
        const userDisplay = document.getElementById('display')
        let text = '<h5>User Info</h5>'
        userDisplay.innerHTML = ''
        Object.keys(user).forEach(
            key => (text += '<li><b>' + key + '</b>: <i>' + user[key] + '</i></li>')
        )

        userDisplay.innerHTML = '<ul>' + text + '</ul>';
     } else {
        log('User not found');
     }
    }
  }


// Get the contact ID from the selected option in the contact select list
function getSelectedContactId() {
    return document.getElementById('contactDropDown').value
}

// Update the contact form with data from a contact
function updateContactForm(contact) {
    document.getElementById('primary-contact').value = contact.primaryContact
    document.getElementById('id').value = contact.contactId
    document.getElementById('firstN').value = contact.firstName
    document.getElementById('lastN').value = contact.lastName
    document.getElementById('emailN').value = contact.emailAddress
    document.getElementById('home-phone').value = contact.homePhoneNumber
    document.getElementById('business-phone').value = contact.businessPhoneNumber
    document.getElementById('buddy').checked = contact.buddy === 'true'
}

/**
 * Directory functions
 **/

// Fetch one user from the directory
function fetchUser() {
    const userId = document.getElementById('user-id').value
    client.user.fetch(userId)
}

// Search the directory for users
function searchDirectory() {
    const filterValue = document.getElementById('filter-value').value
    const filterType = document.querySelector('input[name=filter-key]:checked').value
    // intially it was written "document.querySelector('input[name=filter-type]:checked').value"

    client.user.search({
        [filterType]: filterValue
    })
}

// Fetch your own user information
function fetchSelf() {
    client.user.fetchSelfInfo()
    console.log('fetched self -----', document.getElementById('userEmail').value);
}


// Helper function to update the contacts select list
function updateUserList() {
    const select = document.getElementById('userDropDown')
    const contactId = document.getElementById('id').value // created reference for contactId locally
    select.innerHTML = ''
    const users = client.user.getAll()
    for (let userId in users) {
        for (let opt of select.options) {
            if (opt.value === userId) {
                select.removeChild(opt)
            }
        }
        var opt = document.createElement('option')
        opt.value = opt.text = contactId; // "Error: contactId was not defined"
        select.appendChild(opt)
        if (select.options.length === 1) {
            renderUser(userId)
        }
    }
}

// Helper function to render a contact and update the user form
function renderUser(id) {
    const userId = id || getSelectedUser()

    if (userId != undefined && userId != "") {
        const user = client.user.get(userId)
        if (user != undefined && user != "") {
            const userDisplay = document.getElementById('display')
            let text = '<h5>User Info</h5>'
            userDisplay.innerHTML = ''
            Object.keys(user).forEach(
                key => (text += '<li><b>' + key + '</b>: <i>' + user[key] + '</i></li>')
            )

            userDisplay.innerHTML = '<ul>' + text + '</ul>';
        } else {
            log('User not found');
        }
    }
}

// Get the contact ID from the selected option in the contact select list
function getSelectedUser() {
    return document.getElementById('userDropDown').value
}

// Utility function for appending messages to the message div.
function log(message) {
    console.log(message);
    document.getElementById('terminal').innerHTML += '<p>' + message + '</p>';
}

const directoryForm = document.getElementById('directory')
const addressBookForm = document.getElementById('addressBook')
