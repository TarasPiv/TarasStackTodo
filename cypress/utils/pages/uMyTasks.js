import uSideMenu from "./uSideMenu";

//selectors
const selectors = {
    addATask: 'a:eq(8)',
    taskField: '#task',
    saveTaskBtn: '#submit',
    firstSavedTask: 'tr:eq(1)',
    secondSavedTask: 'tr:eq(2)',
    thirdSavedTask: 'tr:eq(3)',
    viewTaskBtn: '.btn-outline-primary', //can be accepted to any saved task
    editTaskBtn: '.btn-outline-secondary',
    deleteTaskBtn: '.btn-outline-danger',
    viewTaskField: '.card-body',
}

//Expected
const expected = {
    urlMyTasks: 'http://stackadapt-interview.us-east-1.elasticbeanstalk.com/tasks/my_tasks'
}

//functions
const savedTaskNumber = (number) => cy.get(`tr:eq(${number})`); // function to chose any saved Task

const addNewTask = (text) => {
    uSideMenu.addTask();
    cy.get(selectors.taskField).type(text);
    cy.get(selectors.saveTaskBtn).click()
}




//export
export default {
    ...selectors,
    expected,
    savedTaskNumber,
    addNewTask,
}