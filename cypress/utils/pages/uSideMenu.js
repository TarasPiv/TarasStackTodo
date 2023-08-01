import uLogin from "./uLogin";


//Selectors
const selectors = {
    //menu when user is not authorized
    signUpMenu: '.nav-link:eq(0)',
    loginMenu: '.nav-link:eq(1)',
    //menu when user is authorized
    tasksMenu: '.nav-item.dropdown:eq(0)',
    tasksMenuAdd: '.dropdown-item:eq(0)',
    tasksMenuMyTasks: '.dropdown-item:eq(1)',
    usersMenu: '.nav-item.dropdown:eq(1)',
    userMenuUpdProfile: '.dropdown-item:eq(2)',
    userMenuChangePass: '.dropdown-item:eq(3)',
    userMenuLogout: '.dropdown-item:eq(4)',
}


//Expected
const expected = {
    url: 'http://stackadapt-interview.us-east-1.elasticbeanstalk.com/'
}


//functions
const openPage = () => cy.visit(expected.url);

const logOut = () => {
    cy.get(selectors.usersMenu).click();
    cy.get(selectors.userMenuLogout).click();
};
const logIn = (email, pass) => {
    cy.get(selectors.loginMenu).click();
    cy.get(uLogin.loginEmailField).type(email);
    cy.get(uLogin.loginPassField).type(pass);
    cy.get(uLogin.signinBtn).click();
};
const addTask = () => {
    cy.get(selectors.tasksMenu).click();
    cy.get(selectors.tasksMenuAdd).click();
};
const openUserProfile = () => {
    cy.get(selectors.usersMenu).click();
    cy.get(selectors.userMenuUpdProfile).click();
};
const openUserPass = () => {
    cy.get(selectors.usersMenu).click();
    cy.get(selectors.userMenuChangePass).click();
};



//export
export default {
    ...selectors,
    expected,
    openPage,
    logOut,
    logIn,
    addTask,
    openUserProfile,
    openUserPass
}


