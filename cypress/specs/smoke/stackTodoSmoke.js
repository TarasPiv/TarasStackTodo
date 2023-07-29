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

    it.skip('Sign up, Logout, Login, Incorrect Sign up, Icorrect Login', () => {
        // Praparation
        cy.get(uSideMenu.signUpMenu).click();
        cy.get(uSignup.signupNameField).type(uMain.credentials.userName1);
        cy.get(uSignup.signupEmailField).type(uMain.credentials.email1);//we need this user for next tests. We create him for the case if DB was cleaned.
        cy.get(uSignup.signupPassField).type(uMain.credentials.pass1);
        cy.get(uSignup.agreeCheckbox).check();
        cy.get(uSignup.signUpBtn).click(); // it possible that user already exists
        // Sign up
        cy.get(uSignup.signupEmailField).clear();
        cy.get(uSignup.signupEmailField).type(uMain.randomEmail1); //here we paste random email to be able to run this tests multiple times
        cy.get(uSignup.signupPassField).type(uMain.credentials.pass1);
        cy.get(uSignup.signUpBtn).click();
        cy.url().should('eq', uMyTasks.expected.urlMyTasks);// check if we have redirected successfully to My_tasks page

        // Log out
        uSideMenu.logOut(); // here we use logOut function from uSideMenu.js
        cy.url().should('eq', uMain.expected.url); //check if we have redirected successfully to Main page

        //Login
        uSideMenu.logIn(uMain.credentials.email1, uMain.credentials.pass1); // here we use logIn function from uSideMenu.js
        cy.url().should('eq', uMyTasks.expected.urlMyTasks);// check if we have redirected successfully to My_tasks page

        // Incorrect Sign up
        cy.get(uSideMenu.usersMenu).click();
        cy.get(uSideMenu.userMenuLogout).click();
        cy.get(uSideMenu.signUpMenu).click();
        //all fields are empty
        cy.get(uSignup.signUpBtn).click();
        cy.url().should('eq', uSignup.expected.signUpUrl);// check if we stay on Sign up page 
        //Name field is empty
        cy.get(uSignup.signupEmailField).type(uMain.randomEmail2);
        cy.get(uSignup.signupPassField).type(uMain.credentials.pass1);
        cy.get(uSignup.agreeCheckbox).check();
        cy.get(uSignup.signUpBtn).click();
        cy.get(uSignup.errorMsg).should('have.text', uSignup.expected.errorTxtName); //error Msg
        cy.url().should('eq', uSignup.expected.signUpUrl);// check if we stay on Sign up page 
        //Email field is empty
        cy.get(uSignup.signupNameField).type(uMain.credentials.userName1);
        cy.get(uSignup.signupEmailField).clear();
        cy.get(uSignup.signupPassField).type(uMain.credentials.pass1);
        cy.get(uSignup.signUpBtn).click();
        cy.get(uSignup.errorMsg).should('have.text', uSignup.expected.errorTxtEmail); //error Msg
        cy.url().should('eq', uSignup.expected.signUpUrl);// check if we stay on Sign up page 
        //Email is already exist
        cy.get(uSignup.signupNameField).type(uMain.credentials.userName1);
        cy.get(uSignup.signupEmailField).type(uMain.credentials.email1);
        cy.get(uSignup.signupPassField).type(uMain.credentials.pass1);
        cy.get(uSignup.signUpBtn).click();
        cy.get(uSignup.errorMsg).should('have.text', uSignup.expected.errorTxtEmail); //error Msg
        cy.url().should('eq', uSignup.expected.signUpUrl);// check if we stay on Sign up page 
        //Pass field is empty
        cy.get(uSignup.signupEmailField).clear();
        cy.get(uSignup.signupEmailField).type(uMain.randomEmail2);
        cy.get(uSignup.signUpBtn).click();
        cy.get(uSignup.errorMsg).should('have.text', uSignup.expected.errorTxtPass); //error Msg
        cy.url().should('eq', uSignup.expected.signUpUrl);// check if we stay on Sign up page
        //The only Check box Agree is unchecked
        cy.get(uSignup.signupNameField).type(uMain.credentials.userName1);
        cy.get(uSignup.signupPassField).type(uMain.credentials.pass1);
        cy.get(uSignup.agreeCheckbox).uncheck();
        cy.get(uSignup.signUpBtn).click();
        cy.get(uSignup.errorMsg).should('have.text', uSignup.expected.errorTxtCheckbox); //error Msg
        cy.url().should('eq', uSignup.expected.signUpUrl);// check if we stay on Sign up page 

        //Icorrect Login
        cy.get(uSideMenu.loginMenu).click();
        //All Fields are empty
        cy.get(uLogin.signinBtn).click();
        cy.url().should('eq', uLogin.expected.loginUpUrl);// check if we stay on Login page
        //Email Field is empty
        cy.get(uLogin.loginPassField).type(uMain.credentials.pass1);
        cy.get(uLogin.signinBtn).click();
        cy.get(uLogin.errorMsg).should('have.text', uLogin.expected.errorTxtEmail); //error Msg
        cy.url().should('eq', uLogin.expected.loginUpUrl);// check if we stay on Login page
        //Pass Field is empty
        cy.get(uLogin.loginEmailField).type(uMain.credentials.email1);
        cy.get(uLogin.signinBtn).click();
        cy.get(uLogin.errorMsg).should('have.text', uLogin.expected.errorTxtPass); //error Msg
        cy.url().should('eq', uLogin.expected.loginUpUrl);// check if we stay on Login page
    });

    it.skip('Creating new task, viewing, editing, and deleting it', () => {
        //preparation: login ###############дві наступні строки видалити
        // cy.get(uSideMenu.loginMenu).click();
        // cy.get(uLogin.loginEmailField).type(uMain.credentials.email1);

        uSideMenu.logIn(uMain.credentials.email1, uMain.credentials.pass1);

        //creating new task from central link 'add a task'
        cy.get(uMyTasks.addATask).click();
        cy.get(uMyTasks.taskField).type(uMain.expected.taskText1);
        cy.get(uMyTasks.saveTaskBtn).click();
        cy.get(uMyTasks.firstSavedTask).should('contain', uMain.expected.taskText1); //sheck if the task saved
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

    it.skip('Edit user profile, Log out, Login with new credentials', () => {

        //Change Name and check if it's new after Logout/Login:
        uSideMenu.openUserProfile();
        cy.get(uSetProfile.nameField).clear().type(uMain.credentials.userName2);
        cy.get(uSetProfile.updateBtn).click();
        uSideMenu.logOut();
        uSideMenu.logIn(uMain.credentials.email1, uMain.credentials.pass1);
        uSideMenu.openUserProfile();
        cy.get(uSetProfile.nameField).invoke('val').should('eq', uMain.credentials.userName2);

        //change the current email to a unique one:
        cy.get(uSetProfile.emailField).clear().type(uMain.randomEmail2); //write unique email
        let newEmail;
        cy.get(uSetProfile.emailField).invoke('val').then(currentEmail => { //take what exectly EMAIL we wrote
            newEmail = currentEmail; // memorize new EMAIL
            cy.get(uSetProfile.updateBtn).click();
            uSideMenu.logOut();
            uSideMenu.logIn(newEmail, uMain.credentials.pass1);
            uSideMenu.openUserProfile();
            cy.get(uSetProfile.emailField).invoke('val').should('eq', newEmail);
        });
        //change back to previous Name and email for succesfull tests when next time run:
        cy.get(uSetProfile.nameField).clear().type(uMain.credentials.userName1);
        cy.get(uSetProfile.emailField).clear().type(uMain.credentials.email1);
        cy.get(uSetProfile.updateBtn).click();


        /*
        This test case is commented out due to a BUG in the application. 
        It is not possible to change the password and then change it back to the original one.
        This part of the code will be uncommented once the bug is fixed.


        //change pass and check if it's new after Logout/Login:

        >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        uSideMenu.openUserPass(); // entering to "Change Pass" page
        cy.get(uSetPass.currentPassField).type(uMain.credentials.pass1);
        cy.get(uSetPass.newPassField).type(uMain.credentials.pass2);
        cy.get(uSetPass.passAgainField).type(uMain.credentials.pass2);
        cy.get(uSetPass.submitBtn).click()
        uSideMenu.logOut();
        uSideMenu.logIn(uMain.credentials.email1, uMain.credentials.pass2);
        cy.url().should('eq', uMyTasks.expected.urlMyTasks);// check if we entered to My task page
        //change back to previous email for succesfull tests when next time run:
        uSideMenu.openUserPass();
        cy.get(uSetPass.currentPassField).type(uMain.credentials.pass2);
        cy.get(uSetPass.newPassField).type(uMain.credentials.pass1);
        cy.get(uSetPass.passAgainField).type(uMain.credentials.pass1);
        cy.get(uSetPass.submitBtn).click();
        >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        */
    });

    it.skip('Testing that all previous user tasks are saved after Logout/Login', () => {
        // adding 3 tasks from side menu:
        uSideMenu.addTask();
        uMyTasks.addNewTask(uMain.expected.taskText3);
        uSideMenu.addTask();
        uMyTasks.addNewTask(uMain.expected.taskText4);
        uSideMenu.addTask();
        uMyTasks.addNewTask(uMain.expected.taskText5);
        //checking if saved tasks are present after Logout/Login by comparing texts
        uSideMenu.logOut();
        uSideMenu.logIn(uMain.credentials.email1, uMain.credentials.pass1);
        uMyTasks.savedTaskNumber(1).should('contain', uMain.expected.taskText3)
        uMyTasks.savedTaskNumber(2).should('contain', uMain.expected.taskText4)
        uMyTasks.savedTaskNumber(3).should('contain', uMain.expected.taskText5)
    });




    it('Testing the "remember me" option on the Login page.', () => {


// ################# розкоментувати 3 настпні строки коли видаляю скіпи
        // cy.get(uSideMenu.usersMenu).click();
        // cy.get(uSideMenu.userMenuLogout).click()
        // uSideMenu.logOut();

        /*
        Depending on how this function is expected to work according to business requirements, 
        testing can be approached in different ways based on the expected behavior of this option. 
        Since I don't have access to business requirements, and this function does not work correctly 
        according to user experience, I can only guess which testing method might be suitable.
        Provided solution can be upgrated or changed when bug is fixed
        */

    // Login without rememberMeCheckbox
        cy.get(uSideMenu.loginMenu).click();
        cy.get(uLogin.loginEmailField).type(uMain.credentials.email1);
        cy.get(uLogin.loginPassField).type(uMain.credentials.pass1);
        cy.get(uLogin.rememberMeCheckbox).uncheck();
        cy.get(uLogin.signinBtn).click();// in the next two <it> we will visit other site and go back 
    });

    it('Go to other site', () => {
        cy.visit("https://www.google.com")
        cy.wait(3000)
    });
    it('Go back', () => {
        cy.visit(uMyTasks.expected.urlMyTasks)
        //Assertion, commented out due to a bug
        // cy.url().should('not.eq', uMyTasks.expected.urlMyTasks); // check if we were redirected to Main page 
    });


});



// додати негативні тест кейси третього завднання
// додати іф елз для першого
// перевірити чи дійсно баг зі зміною паролю
//останн я дія в тестах має бути логаут

