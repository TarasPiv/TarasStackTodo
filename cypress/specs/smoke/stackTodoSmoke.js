import uLogin from "../../utils/pages/uLogin";
import uMain from "../../utils/pages/uMain";
import uMyTasks from "../../utils/pages/uMyTasks";
import uSetPass from "../../utils/pages/uSetPass";
import uSetProfile from "../../utils/pages/uSetProfile";
import uSideMenu from "../../utils/pages/uSideMenu";
import uSignup from "../../utils/pages/uSignup";


describe('Smoke', () => {
    before(() => {
        uMain.openPage();
    });

    it('Sign up, Logout, Login, Incorrect Sign up, Icorrect Login', () => {
        /* Since this assignment can be seen as an exam, and we need to cover top5 MVP cases, + me trying to cover 
        very important functionality, I decided to submit the code in this way for greater 
        clarity of code reading, where I grouped everything by types of tasks. However, in a real project, 
        it is better to divide the tests into smaller `it` blocks for better organization and maintainability.
        */

        // ---Sign up
        cy.get(uSideMenu.signUpMenu).click();
        cy.get(uSignup.signupNameField).type(Cypress.env().TODOUSERNAME1); // usernames, emails and passwords, are hiden for security purposes and provided for GitHub pipeline
        cy.get(uSignup.signupEmailField).type(Cypress.env().TODOUSEREMAIL1);//it is possible that this user is already exists in the DB, but we still need him for the future tests
        cy.get(uSignup.signupPassField).type(Cypress.env().TODOPASS1);
        cy.get(uSignup.agreeCheckbox).check();
        cy.get(uSignup.signUpBtn).click();
        cy.wait(1000)

        cy.url().then((currentUrl) => { // in case if user1 already exists, we create randome one for testing Sign up functionality purposes
            if (currentUrl === uSignup.expected.signUpUrl) {
                cy.get(uSignup.signupEmailField).clear();
                cy.get(uSignup.signupEmailField).type(uMain.randomEmail1);
                cy.get(uSignup.signupPassField).type(Cypress.env().TODOPASS1);
                cy.get(uSignup.signUpBtn).click();
                cy.url().should('eq', uMyTasks.expected.urlMyTasks);
            }
        });

        // ---Log out
        uSideMenu.logOut(); // here we use logOut function from uSideMenu.js
        cy.url().should('eq', uMain.expected.url); //check if we have redirected successfully to Main page

        //---Login
        uSideMenu.logIn(Cypress.env().TODOUSEREMAIL1, Cypress.env().TODOPASS1); // here we use logIn function from uSideMenu.js
        cy.url().should('eq', uMyTasks.expected.urlMyTasks);// check if we have redirected successfully to My_tasks page

        // ---Incorrect Sign up
        cy.get(uSideMenu.usersMenu).click();
        cy.get(uSideMenu.userMenuLogout).click();
        cy.get(uSideMenu.signUpMenu).click();
        //all fields are empty
        cy.get(uSignup.signUpBtn).click();
        cy.url().should('eq', uSignup.expected.signUpUrl);// check if we stay on Sign up page 
        //Name field is empty
        cy.get(uSignup.signupEmailField).type(uMain.randomEmail2);
        cy.get(uSignup.signupPassField).type(Cypress.env().TODOPASS1);
        cy.get(uSignup.agreeCheckbox).check();
        cy.get(uSignup.signUpBtn).click();
        cy.get(uSignup.errorMsg).should('have.text', uSignup.expected.errorTxtName); //error Msg
        cy.url().should('eq', uSignup.expected.signUpUrl);// check if we stay on Sign up page 
        //Email field is empty
        cy.get(uSignup.signupNameField).clear().type(Cypress.env().TODOUSERNAME1);
        cy.get(uSignup.signupEmailField).clear();
        cy.get(uSignup.signupPassField).type(Cypress.env().TODOPASS1);
        cy.get(uSignup.signUpBtn).click();
        cy.get(uSignup.errorMsg).should('have.text', uSignup.expected.errorTxtEmail); //check the error Msg
        cy.url().should('eq', uSignup.expected.signUpUrl);// check if we stay on Sign up page 
        //Email is already exist
        cy.get(uSignup.signupNameField).clear().type(Cypress.env().TODOUSERNAME1);
        cy.get(uSignup.signupEmailField).type(Cypress.env().TODOUSEREMAIL1);
        cy.get(uSignup.signupPassField).type(Cypress.env().TODOPASS1);
        cy.get(uSignup.signUpBtn).click();
        cy.get(uSignup.errorMsg).should('have.text', uSignup.expected.errorTxtEmail); //check the error Msg
        cy.url().should('eq', uSignup.expected.signUpUrl);// check if we stay on Sign up page 
        //Pass field is empty
        cy.get(uSignup.signupEmailField).clear();
        cy.get(uSignup.signupEmailField).type(uMain.randomEmail2);
        cy.get(uSignup.signUpBtn).click();
        cy.get(uSignup.errorMsg).should('have.text', uSignup.expected.errorTxtPass); //check the error Msg
        cy.url().should('eq', uSignup.expected.signUpUrl);// check if we stay on Sign up page
        //The only Check box Agree is unchecked, rest fields are filled correct
        cy.get(uSignup.signupNameField).clear().type(Cypress.env().TODOUSERNAME1);
        cy.get(uSignup.signupPassField).type(Cypress.env().TODOPASS1);
        cy.get(uSignup.agreeCheckbox).uncheck();
        cy.get(uSignup.signUpBtn).click();
        cy.get(uSignup.errorMsg).should('have.text', uSignup.expected.errorTxtCheckbox); //check the error Msg
        cy.url().should('eq', uSignup.expected.signUpUrl);// check if we stay on Sign up page 

        //---Icorrect Login
        cy.get(uSideMenu.loginMenu).click();
        //All Fields are empty
        cy.get(uLogin.signinBtn).click();
        cy.url().should('eq', uLogin.expected.loginUpUrl);// check if we stay on the Login page
        //Email Field is empty
        cy.get(uLogin.loginPassField).type(Cypress.env().TODOPASS1);
        cy.get(uLogin.signinBtn).click();
        cy.get(uLogin.errorMsg).should('have.text', uLogin.expected.errorTxtEmail); //check the error Msg
        cy.url().should('eq', uLogin.expected.loginUpUrl);// check if we stay on the Login page
        //Pass Field is empty
        cy.get(uLogin.loginEmailField).clear().type(Cypress.env().TODOUSEREMAIL1);
        cy.get(uLogin.signinBtn).click();
        cy.get(uLogin.errorMsg).should('have.text', uLogin.expected.errorTxtPass); //error Msg
        cy.url().should('eq', uLogin.expected.loginUpUrl);// check if we stay on the Login page
        //wrong email
        cy.get(uLogin.loginEmailField).clear().type(uMain.credentials.wrongEmail);
        cy.get(uLogin.loginPassField).type(Cypress.env().TODOPASS1);
        cy.get(uLogin.signinBtn).click();
        cy.get(uLogin.wrongLoginMsg).should('contain', uLogin.expected.wrongLoginTxt); //error Msg
        cy.url().should('eq', uLogin.expected.loginUpUrl);// check if we stay on the Login page
        //wrong pass
        cy.get(uLogin.loginEmailField).clear().type(Cypress.env().TODOUSEREMAIL1);
        cy.get(uLogin.loginPassField).type(uMain.randomPass);
        cy.get(uLogin.signinBtn).click();
        // cy.get(uLogin.wrongLoginMsg).should('have.text', uLogin.expected.wrongPassTxt); // >>>>>>>>> BUG: Error msg should be about wrong Pass, not wrong Login 
        cy.url().should('eq', uLogin.expected.loginUpUrl);// check if we stay on the Login page
    });

    it('Creating new task, viewing, editing, and deleting it', () => {
        //preparation: login
        uSideMenu.logIn(Cypress.env().TODOUSEREMAIL1, Cypress.env().TODOPASS1);

        //creating new task from central link 'add a task'
        cy.get(uMyTasks.addATask).click();
        cy.get(uMyTasks.taskField).type(uMain.expected.taskText1);
        cy.get(uMyTasks.saveTaskBtn).click();
        cy.get(uMyTasks.firstSavedTask).should('contain', uMain.expected.taskText1); //check if the task saved
        cy.url().should('eq', uMyTasks.expected.urlMyTasks);// check if we stay on Login page

        //view saved task
        uMyTasks.savedTaskNumber(1).find(uMyTasks.viewTaskBtn).click();
        cy.get(uMyTasks.viewTaskField).should('contain', uMain.expected.taskText1);

        //edit saved task
        cy.get(uSideMenu.tasksMenu).click();
        cy.get(uSideMenu.tasksMenuMyTasks).click();
        uMyTasks.savedTaskNumber(1).find(uMyTasks.editTaskBtn).click();
        cy.get(uMyTasks.taskField).should('have.text', uMain.expected.taskText1);//compare to text when created
        cy.get(uMyTasks.taskField).clear();//clear and type new text
        cy.get(uMyTasks.taskField).type(uMain.expected.taskText2);
        cy.get(uMyTasks.saveTaskBtn).click();
        uMyTasks.savedTaskNumber(1).find(uMyTasks.viewTaskBtn).click();//check if new text was saved 
        cy.get(uMyTasks.viewTaskField).should('contain', uMain.expected.taskText2);//compare to new text

        //delete saved task
        cy.get(uSideMenu.tasksMenu).click();
        cy.get(uSideMenu.tasksMenuMyTasks).click();
        uMyTasks.savedTaskNumber(1).find(uMyTasks.deleteTaskBtn).click();
        //check if task is deleted: if we are not able to find on the page button DELETE, that means no more tasks to delete.
        //this method is particular for our case. If we test full functionality we can compare the texts of tasks and verify thay are absent
        cy.get(uMyTasks.deleteTaskBtn).should('not.exist');
    });

    it('Edit user profile, Log out, Login with new credentials', () => {

        //Change Name and check if it's new after Logout/Login:
        uSideMenu.openUserProfile();
        cy.get(uSetProfile.nameField).clear().type(Cypress.env().TODOUSERNAME2);
        cy.get(uSetProfile.updateBtn).click();
        uSideMenu.logOut();
        uSideMenu.logIn(Cypress.env().TODOUSEREMAIL1, Cypress.env().TODOPASS1);
        uSideMenu.openUserProfile();
        cy.get(uSetProfile.nameField).invoke('val').should('eq', Cypress.env().TODOUSERNAME2);

        //change the current email to a unique one:
        cy.get(uSetProfile.emailField).clear().type(uMain.randomEmail2); //write unique email
        let newEmail;
        cy.get(uSetProfile.emailField).invoke('val').then(currentEmail => { //take what exectly EMAIL we wrote
            newEmail = currentEmail; // memorize new EMAIL
            cy.get(uSetProfile.updateBtn).click();
            uSideMenu.logOut();
            uSideMenu.logIn(newEmail, Cypress.env().TODOPASS1);
            uSideMenu.openUserProfile();
            cy.get(uSetProfile.emailField).invoke('val').should('eq', newEmail);
        });
        //change back to previous Name and email for succesfull future tests:
        cy.get(uSetProfile.nameField).clear().type(Cypress.env().TODOUSERNAME1);
        cy.get(uSetProfile.emailField).clear().type(Cypress.env().TODOUSEREMAIL1);
        cy.get(uSetProfile.updateBtn).click();


        /*
        This part of code is commented out due to two BUGs in the application. 
        - It is not possible to change the password used in our tests and then change it back to the original one.
        - Application allows to Login user with two different passwords
        This part of the code will be uncommented once the bugs are fixed.

        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        //change the pass and check if it's new after Logout/Login:
        uSideMenu.openUserPass(); // entering to "Change Pass" page
        cy.get(uSetPass.currentPassField).type(Cypress.env().TODOPASS1);
        cy.get(uSetPass.newPassField).type(Cypress.env().TODOPASS2);
        cy.get(uSetPass.passAgainField).type(Cypress.env().TODOPASS2);
        cy.get(uSetPass.submitBtn).click() // >>>>>>>>>>>>>> BUG: unexpected error MSG "Please Enter a valid Current password"
        uSideMenu.logOut();
        uSideMenu.logIn(Cypress.env().TODOUSEREMAIL1, Cypress.env().TODOPASS2);
        cy.url().should('eq', uMyTasks.expected.urlMyTasks);// check if we entered to My task page
        uSideMenu.openUserPass();//change back to previous email for succesfull tests when next time run:
        cy.get(uSetPass.currentPassField).type(Cypress.env().TODOPASS2);
        cy.get(uSetPass.newPassField).type(Cypress.env().TODOPASS1);
        cy.get(uSetPass.passAgainField).type(Cypress.env().TODOPASS1);
        cy.get(uSetPass.submitBtn).click();

        // chack that only one password can be accepted by a wabsite
        uSideMenu.logOut();
        uSideMenu.logIn(Cypress.env().TODOUSEREMAIL1, Cypress.env().TODOPASS1);
        cy.url().should('eq', uMyTasks.expected.urlMyTasks);// check if we entered to My task page
        uSideMenu.logOut();
        uSideMenu.logIn(Cypress.env().TODOUSEREMAIL1, Cypress.env().TODOPASS2);
        cy.url().should('not.eq', uMyTasks.expected.urlMyTasks);// >>>>>>>>> BUG: The website was not supposed to proceed to this page, but it did.
        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        */
    });

    it('Testing that all previous user tasks are saved after Logout/Login', () => {
        // adding 3 tasks from side menu:
        uSideMenu.addTask();
        uMyTasks.addNewTask(uMain.expected.taskText3);
        uSideMenu.addTask();
        uMyTasks.addNewTask(uMain.expected.taskText4);
        uSideMenu.addTask();
        uMyTasks.addNewTask(uMain.expected.taskText5);
        //checking if saved tasks are present after Logout/Login by comparing texts
        uSideMenu.logOut();
        uSideMenu.logIn(Cypress.env().TODOUSEREMAIL1, Cypress.env().TODOPASS1);
        uMyTasks.savedTaskNumber(1).should('contain', uMain.expected.taskText3)
        uMyTasks.savedTaskNumber(2).should('contain', uMain.expected.taskText4)
        uMyTasks.savedTaskNumber(3).should('contain', uMain.expected.taskText5)
        uSideMenu.logOut();

    });


    it('Testing the "remember me" option on the Login page.', () => {

        /*
        Depending on how this function is expected to work according to business requirements, 
        testing can be approached in different ways based on the expected behavior of this option. 
        Since I don't have access to business requirements, and this function does not work correctly 
        according to user experience, I can only guess which testing method might be suitable.
        !!!Provided solution is not final and can be upgrated or changed when bug is fixed.
        The Other approach is to play with tocken (this App stores tocken in cookies only when you do Login with rememberMe Checkbox)
        */

        // Login without rememberMeCheckbox
        cy.get(uSideMenu.loginMenu).click();
        cy.get(uLogin.loginEmailField).type(Cypress.env().TODOUSEREMAIL1);
        cy.get(uLogin.loginPassField).type(Cypress.env().TODOPASS1);
        cy.get(uLogin.rememberMeCheckbox).uncheck();
        cy.get(uLogin.signinBtn).click();// in the next two <it> we will visit other site and go back to check if the App remember user
    });

    it('Go to other site', () => {
        cy.visit("https://www.google.com")
    });
    it('Go back', () => {
        cy.visit(uMyTasks.expected.urlMyTasks)
        //Assertion, commented out due to a  >>>>>>>>> BUG
        // cy.url().should('not.eq', uMyTasks.expected.urlMyTasks); // check if we were redirected to Main page 


        //WE can also take an alternative approach. 
        // - Perform user authentication with the "remember me" checkbox checked
        // - verify that the token has been created: cy.getCookie('remember_token').should('exist');
        // - navigate to a different site in another <it> block, 
        // -  in another <it> block, return and verify that the token still exists.
        // This ensures the functionality of user rememberance is tested. But again, we need to choose best approach after clirifying this functionality in requirements
    });



    it('>>>>>>> Extra task: Translate the manual test case into an automation test case. Delete and verify tasks', () => {

        // BONUS POINT !!! Architect a solution to “pre-load” the db with relevant data to speed up the test.

        // We are using cy.intercept() to intercept the GET request to the api.url endpoint.
        // When this GET request occurs, we will reply with the 'testData' variable, providing the test data for the user notes instead of making a real request to the server.
        const testData = [
            { text: uMain.expected.taskText3 },
            { text: uMain.expected.taskText4 },
            { text: uMain.expected.taskText5 },
        ];
        cy.intercept('GET', 'http://stackadapt-interview.us-east-1.elasticbeanstalk.com', (req) => {
            req.reply(testData);
        });
        cy.get(uMyTasks.firstSavedTask).should('contain', testData[0].text); //compare preloaded texts
        cy.get(uMyTasks.secondSavedTask).should('contain', testData[1].text);
        cy.get(uMyTasks.thirdSavedTask).should('contain', testData[2].text);
        uMyTasks.savedTaskNumber(3).find(uMyTasks.deleteTaskBtn).click();
        uMyTasks.savedTaskNumber(2).find(uMyTasks.deleteTaskBtn).click();
        cy.get(uMyTasks.deleteTaskBtn).should('have.length', 1); //verify that we have only 1 button to delete task == we have only 1 task on the page
        // deleting last task and LogOut to be able to run succesfully these tests from the beginning
        uMyTasks.savedTaskNumber(1).find(uMyTasks.deleteTaskBtn).click();

        cy.request('http://stackadapt-interview.us-east-1.elasticbeanstalk.com/').its('body').then((body) => {// this will сhange back our response type from 'application/json' to 'text/html'.
            cy.document().invoke('write', body);
        });
        uSideMenu.logOut();

    });

});
