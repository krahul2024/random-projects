import jwt from 'jsonwebtoken';
import config from '../config.js'
//--------this is the function to authenticate the user when the user has to access something after logged in 
//------ like visiting the profile and updation of profile etc so every logged in user has a jwt token and 
//------ and after verification of that token we will be granting the user to do the restricted stuff
export const auth = async (req, res, next) => {

    try {

        //first we have to access authorize header from the token
        const token = req.headers.authorization.split(" ")[1]; //the token structure is something like this:{bearer token} so we split this string and then access second string
        console.log(token);
        //getting the user information from the token,for this we have to use jwt function
        const decoded_token = await jwt.verify(token, config.JWT_SECRET); //this returns decoded token as in the format of object
        req.user = decoded_token;
        next();

    } catch (error) {
        return res.status(401).send({
            error: "Authentication failed!"
        });
    }

}

//this function is for accessing the otp variable when in verify_otp function
export const local_variables = (req, res, next) => {
    req.app.locals = {
        otp: null,
        resetSession: false
    }
    next();

}