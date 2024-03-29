// selectors
const selectors = {
    loginEmailField: '#login',
    loginPassField: '#password',
    rememberMeCheckbox: '#remember',
    signinBtn: '#submit',
    errorMsg: '.error.text-danger', //same class for different Masseges, so if we have more than 1 on the page, just add index in tests
    wrongLoginMsg: '.alert.alert-danger',
}

//expected
const expected = {
    loginUpUrl: 'http://stackadapt-interview.us-east-1.elasticbeanstalk.com/login',
    errorTxtEmail: 'Please Enter a valid Email ',
    errorTxtPass: 'Please Enter a valid Password ',
    wrongLoginTxt: 'Sorry, invalid login',
    wrongPassTxt: '$$$$$!!! add expected error MSG from Requirements!!!$$$$$'
}


//functions


//export
export default {
    ...selectors,
    expected,
}