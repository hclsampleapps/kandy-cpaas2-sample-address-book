# kandy-cpaas2-sample-address-book

### Directory and Address Book App

This app is used to add contacts in your address book and then search in your directory if the user name exists or not based on various search parameters (e.g. Name(first or last), First Name, Last Name and Phone Number).

1. Create an account on **AT&T** portal via [Register now for a free account](https://nvs-apimarket.kandy.io/signup).
2. After signup get the following 
   - *clientId* 
   - *emailId* 
   - *password*
3. If you are an existing user, please [Log in to AT&T API Marketplace](https://nvs-apimarket.kandy.io/login).
4. Download *kandy.js* from [Developer documentation - SDKs](https://nvs-apimarket.kandy.io/developer/sdks/javascript)
5. Login using your credentials (Account ClientID, EmailID and Password).
6. After successful login, Navigate to AddressBook for adding more contacts in your directory
7. Enter the following details for required fields given below :
    - *ID (it should be unique for every contacts added)* 
    - *Primary Contact* 
    - *First Name*
    - *Last Name* 
    - *Home PhoneNumber* 
    - *Business PhoneNumber*
    - *Email ID* 
    - *Buddy (click on checkbox, it should always br true)*
8. Click on "Add" button to add the contacts in the list.
9. You can also update added contacts if any field is missing or needs alteration, by clicking on "update" button.
10. After adding contacts, you can view the list of existing contacts in your list, by clicking on "Refresh Contacts" button. A list of all recently added and existing users will appear in the dropdown list named as "Address Book Contacts".
11. You can also remove/delete any existing users, by selecting the unique contact Id from the dropdown list and then click on "Remove" button.
12. You can also clear all input fields by clicking on "Clear" button.
13. Navigate again to Directory Part, to check if the user's email id and name exists in the directory.
14. Enter UserID ex: janedoe@somedomain.com ([userId]@[domain]), to check if any user exists in the directory with same id or not by clicking on "Fetch User" button.
15. You can also search any contact by filtering the Name(First or Last), First Name, Last Name or Phone Number, by clicking on "Search Directory" button. It will get list of all the contacts based on various search parameters.
16. You can also search yourself by clicking on "Fetch Self" button which return all details of the present logged in user.

### Development

To setup the project repository, run these commands

```
git clone https://github.com/hclsampleapps/kandy-cpaas2-sample-address-book.git
cd kandy-cpaas2-sample-address-book
```

Then, open ```index.html``` in the browser to view the app.

#### Branching strategy

To learn about the branching strategy, contribution & coding conventions followed in the project, please refer [GitFlow based branching strategy for your project repository](https://gist.github.com/ribbon-abku/10d3fc1cff5c35a2df401196678e258a)
