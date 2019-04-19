# kandy-cpaas2-sample-address-book

### Directory and Address Book App

This app is used to add contacts in your address book and then search in your directory if the user name exists or not based on various search parameters (e.g. Name(first or last), First Name, Last Name and Phone Number).

 - Try the [demo](https://hclsampleapps.github.io/kandy-cpaas2-sample-address-book/app/)
 - Get the [source code](https://github.com/hclsampleapps/kandy-cpaas2-sample-address-book)

#### User manual 

1. Create an account on **AT&T** portal via [Register now for a free account](https://apimarket.att.com/signup).
2. Open an instance of `index.html` in the browser for a *User*.
3. Enter the *server URL*, for e.g.,
    - For AT&T API Marketplace [apimarket.att.com](https://apimarket.att.com), enter `https://oauth-cpaas.att.com`
4. Choose to get accessToken by *Password Grant* flow or *Client Credentials* flow.
5. Login using *User*'s credential in the browser window.
6. For **Password Grant** flow, enter 
    - *clientId* 
    - *emailId* 
    - *password*  
7. For **Client Credentials Grant** flow, enter
    - *privateKey*
    - *privateSecret*   
8. Click ***Login***
9. After successful login, navigate to ***Address-book*** by selecting the radio button at top, for adding more contacts in your directory
10. Enter the following details for required fields given below:
    - *ID (it should be unique for every contacts added)* 
    - *Primary Contact* 
    - *First Name*
    - *Last Name* 
    - *Home PhoneNumber* 
    - *Business PhoneNumber*
    - *Email ID* 
    - *Buddy (click on checkbox, it should always br true)*
11. Click on ***Add*** button to add the contacts in the list.
12. You can also update added contacts if any field is missing or needs alteration, by clicking on ***Update*** button.
13. After adding contacts, you can view the list of existing contacts in your list, by clicking on ***Refresh Contacts*** button. A list of all recently added and existing users will appear in ***Display address-book contacts*** ⟶ ***Contacts*** dropdown list.
14. You can also remove/delete any existing users, by selecting the unique contact Id from the dropdown list and then click on ***Remove*** button.
15. You can also clear all input fields by clicking on ***Clear*** button.
16. Navigate again to ***Directory*** by selecting the radio button at top, to check if the user's email id and name exists in the directory.
17. Enter the *User ID*, e.g., janedoe@somedomain.com ([userId]@[domain]), to check if any user exists in the directory with same id or not by clicking on ***Fetch User*** button.
18. You can also search any contact by filtering the *Name (First or Last)*, *First Name*, *Last Name* or *Phone Number*, by clicking on ***Search Directory*** button. It will get list of all the contacts based on various search parameters.
19. You can also search yourself by clicking on ***Fetch Self*** button which return all details of the present logged in user.

##### Notes

 - Existing user can confirm their account via [Log in to AT&T API Marketplace](https://apimarket.att.com/login)
 - You can download *kandy.js* from [Developer documentation - SDKs](https://apimarket.att.com/developer/sdks/javascript)

### Development

To setup the project repository, run these commands

```
git clone https://github.com/hclsampleapps/kandy-cpaas2-sample-address-book.git
cd kandy-cpaas2-sample-address-book
```

Then, open ```index.html``` in the browser to view the app.

#### Branching strategy

To learn about the branching strategy, contribution & coding conventions followed in the project, please refer [GitFlow based branching strategy for your project repository](https://gist.github.com/ribbon-abku/10d3fc1cff5c35a2df401196678e258a)
