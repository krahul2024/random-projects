import toast from 'react-hot-toast'; //for displaying messages

//to validate the register form

export const validateRegister = async (values) => {
    const email_error = emailValidate(values),
        username_error = usernameValidate(values),
        password_error = passwordValidate(values);
    return email_error ? email_error : username_error ? username_error : password_error;
}


export const validateProfile = async (values) => {
    const name_error = nameValidate(values),
        email_error = emailValidate(values),
        phone_error = phoneValidate(values);
    return name_error?name_error:email_error?email_error:phone_error;
}





//to validate the login credentials like validating the username here
export const usernameValidate = async (values) => {
    const errors = usernameVerify({}, values); //getting all the errors when we got user details from username form

    return errors; //returnin errors object
}
//this one is for password
export const passwordValidate = async (values) => {
    const errors = passwordVerify({}, values); //getting all the errors when we entered the password for an username
    return errors;
}
//for validation of email
export const emailValidate = async (values) => {
    const errors = userEmailVerify({}, values);
    return errors;
}

const phoneValidate=async(values)=>{
    const errors=verifyPhone({},values);
    return errors;
}

const nameValidate=async (values)=>{
    const errors=verifyName({},values);
    return errors;
}






//to validate the password
const passwordVerify = (error = {}, values) => {
    const specialCharacters = '(?=.*[ -\/:-@\[-\`{-~]{1,})'; //will implement this thing later
    if (!values.password) error.password = toast.error('Password Required!'); //in case of no password
    else if (values.password.length < 5) error.password = toast.error('Password Too Short!'); //in case of password less than 5 characters
    return error;
}

// validate the username
const usernameVerify = (error = {}, values) => {
    // in case no username
    if (!values.username) error.username = toast.error('Username Required!');
    else if (values.username.includes(" ")) error.username = toast.error("Don't Do That!"); //in case of empty username

    return error; //we are returning an object which consists of errors
}

const userEmailVerify = (error = {}, values) => {
    if (!values.email) error.email = toast.error('Email Required!');
    else if (!values.email.includes('@')) error.email = toast.error('Not a valid E-mail!');
    return error;
}

const verifyName = (error = {}, values) => {
    if (!values.name) error.name = toast.error('Name Required!');
    return error;
}
const verifyPhone = (error = {}, values) => {
    if (values.phone) {
        if (!(values.phone.length === 10)) error.phone = toast.error('Invalid Phone Number!');
        else {
            let phone = values.phone;
            let yes = true;
            for (let i = 0; i < phone.length; i++)
                if (phone[i] < '0' || phone[i] > '9') yes = false;

            if (!yes) error.phone = toast.error('Invalid Phone Number!');
        }
    }
    return error;
}