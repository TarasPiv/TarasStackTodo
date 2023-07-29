//selectors
const selectors = {
    //Sign up page
    signupNameField: '#name', 
    signupEmailField: '#email',
    signupPassField: '#password',
    agreeCheckbox: '#agree',
    signUpBtn: '#submit',
    errorMsg: '.error.text-danger', //same class for different Masseges, so if we have more than 1 on the page, just add index in tests
    }
    
    //expected
    const expected = {
    signUpUrl: 'http://stackadapt-interview.us-east-1.elasticbeanstalk.com/signup',
    errorTxtName: 'Please Enter a valid Name ',
    errorTxtEmail: 'Please Enter a valid Email ',
    errorTxtPass: 'Please Enter a valid Password ',
    errorTxtCheckbox: 'This checkbox is required',
    }

    //functions


    //export
export default{
    ...selectors,
    expected
}