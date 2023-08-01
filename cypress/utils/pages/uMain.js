//Selectors



//Expected
const expected = {
    url: 'http://stackadapt-interview.us-east-1.elasticbeanstalk.com/',
    taskText1: 'A perfect cup of coffee starts my day right. ACT!',
    taskText2: 'Explain to Tim how to make the perfect coffee',
    taskText3: 'Tell IAN some fascinating facts about coffee',
    taskText4: 'Engage in coding',
    taskText5: 'Find something interesting and new in the tests',
}

//credentials
const credentials = {
    wrongEmail: 'wrongEmail@gmail.com'
}

//functions
const openPage = () => cy.visit(expected.url)


//random credentials
const randomNumbers1 = Math.floor(Math.random() * 80000); // Generates random numbers
const randomEmail1 = `testuser${randomNumbers1}@gmail.com`;     // Combines the random numbers with a base email address
const randomNumbers2 = Math.floor(Math.random() * 90000); // We need additional random to avoid same values. Yes it happens...
const randomEmail2 = `retroCars${randomNumbers2}@gmail.com`;   
const randomPass = `retroCars${randomNumbers2}@gmail.com`;   


//export
export default {
    expected,
    credentials,
    openPage,
    randomEmail1,
    randomEmail2,
    randomPass
}

