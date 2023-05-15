import User from '../models/users.js';
import bcrypt from 'bcrypt'; //for using hashed passwords
import jwt from 'jsonwebtoken'; //for using jwt tokens
import config from '../config.js';
import otp_generator from 'otp-generator'; //for generation of the otp

export const verify_user = async (req, res, next) => {

    try {
        const {
            username
        } = req.method == 'GET' ? req.query : req.body;
        //checking the user existence
        let user_exists = User.findOne({
            username
        });

        if (!user_exists) return res.status(404).send({
            msg: `${username} is not registered!`
        });
        next(); //in case if the user exists then calling the next function here the next function is login etc.

    } catch (error) {
        return res.status(404).send({
            error: "Something wrong with access and authentication!"
        });
    }
}


//------------------this is for handling the user registration------------------------
export const register = async (req, res) => {
    try{
        const {username,password,profile,email}=req.body;
        //checking the existing user
        const is_username_unique=new Promise((resolve,reject)=>{
            User.findOne({username},(err,user)=>{
                if(err) reject(new Error(err));//in case of any error
                if(user) reject({error:"This username is already registered"});//in case if the username already exists
                resolve();//if all goes well 
            });
        });
        //checking for existing email
        const is_email_unique=new Promise((resolve,reject)=>{
            User.findOne({email},(err,user)=>{
                if(err) reject(new Error(err));
                if(user) reject({error:'This email is already registered!'});
                resolve();
            });
        });

        //now hashing the password and storing the user in database
        Promise.all([is_username_unique, is_email_unique]).then(()=>{//in case there is unique email and username
            if(password){
                bcrypt.hash(password,10).then(hashedPassword=>{

                    const new_user=new User({
                        username,
                        password:hashedPassword,
                        profile: profile || ' ',
                        email
                    });//new user created and ready to register and saved to the database
                //now returning the saved user as response
                new_user.save()

                .then(result=>res.status(201).send({msg:'Registration successful.'}))
                .catch(error=>res.status(500).send({error}));   

                }).catch(error=>{
                    return res.status(500).send({
                        error:"Unable to hash the password!"
                    });
                });
            }
        }).catch(error=>{
            return res.status(500).send({ error })
        });

    } catch(error){
        return res.status(500).send(error);
    }
    

}

//------------this is for handling the login of user--------------------------
export const login = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    console.log(req.body);

    try {
        User.findOne({
            username
        }).then(result => { //checking if there is such username in the database?
            bcrypt.compare(password, result.password).then(password_check => { //comparing the password with corresponding username password
                if (!password_check) return res.status(400).send({
                    error: "Don't have a password"
                }); //in case of null password

                // in case if password matches then create a jwt token read more about jwt tokens on their website
                const token = jwt.sign({ //in signing jwt tokens we have to mention three parameters first is information about the user,second is secret:{some string} and the last one is expiration time
                    userId: result._id,
                    username: result.username,
                }, config.JWT_SECRET, {
                    expiresIn: "48h"
                }); //this jwt token will expire in 2 days

                return res.status(200).send({
                    msg: "Login Successful!",
                    username: result.username,
                    token
                }); //sending token and other details after successful login

            }).catch(error => {
                return res.status(400).send({
                    error: "wrong password!"
                })
            }); //in case of wrong password

        }).catch(error => {
            return res.status(400).send({
                error: "No such username is registered with us."
            })
        }); //in case of no matching username is found for the said username


    } catch (error) {
        return res.status(500).send({
            error: "There was some error!"
        });
    }
}


//-------------this is for fetching user information when asked for an user information-----------------------
export const get_user = async (req, res) => {
    const {
        username
    } = req.params; //as we are passing the value of the username in the parameters , hence we can access username from parameters also
    try {
        if (!username) res.status(404).send({
            error: "You have to login first to access this page!"
        }); //in case of no username and trying to access the user information
        User.findOne({
            username
        }, (error, result) => {
            if (error) return res.status(500).send({
                error
            });
            else if (!result) return res.status(404).send({
                error: `${username} is not registered with us!`
            });

            const {
                password,
                ...rest
            } = Object.assign({}, result.toJSON()); //filtering out the password field as we don't want to send the password in the response and as a response a lot of data is sent so to filter that our we are doing the rest of things
            return res.status(201).send(rest); //in case of successful operation
        })

    } catch (error) {
        res.status(404).send({
            error: 'Something is messed up!'
        })
    }

}


//------------this is for updation of user---------------------------------
export const update_user = async (req, res) => {
    //so far we have to update the username,phone and email only

    try{

        const {user_id}=req.user;

        if(user_id){//in case if the user_id is not null
            const body=req.body;//getting the information from the body for details to be updated

            //updating the data
            User.updateOne({_id:user_id},body,(err,data)=>{
                if(err)throw err;//just throwing the error to be caught in the catch block at the end of the try block
                return res.status(201).send({msg:'User information updated!'});//after the successfull update
            });
        }
        else return res.status(401).send({error:`User doesn't exist!`});
    }
    
    catch(error){
        return res.status(401).send({error});
    }

}


//-----------------for generation of otp------------------------
export const generate_otp = async (req, res) => {
    req.app.locals.otp = await otp_generator(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    }); //to generate otp of length 6 with only numbers
    return res.status(201).send({
        code: req.app.locals.otp
    });
}

//------------------------for verification of otp------------------
export const verify_otp = async (req, res) => {
    const {
        code
    } = req.query;
    if (parseInt(req.app.locals.otp) === parseInt(code)) {
        req.app.locals.otp = null; //to reset the otp value
        req.app.locals.resetSession = true; //set the session for reset password
        return res.status(201).send({
            msg: 'OTP verification successful!'
        });
    }
    return res.status(400).send({
        error: 'Invalid OTP!'
    });
}

//----------for setting and resetting the session variables or for keeping some user logged in/out------------
export const create_reset_session = async (req, res) => {
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false;
        return res.status(201).send({
            msg: "Acess granted!"
        });
    }
    return res.status(440).send({
        error: 'Session Expired!'
    });

}

//-------------for resetting of the password-------------------
export const reset_password = async (req, res) => {

    const {
        username,
        password
    } = req.body;

    try {
        if (!req.app.locals.resetSession) return res.status(400).send({
            error: 'Session Expired!'
        });

        try {
            User.findOne({ //finding the user with provided username
                username
            }).then(result => { //if successfully found the user
                bcrypt.hash(password, 10).then(hashedPassword => { //hashing newly found password
                    User.updateOne({ //updating newly hashed password
                        username: result.username
                    }, {
                        password: hashedPassword
                    }, (err, data) => { //if some error during password update then throw the error
                        if (err) throw err;
                        req.app.locals.resetSession=false;//resetting the session so that only valid users can update the password
                        return res.status(201).send({ //this is when password update is successful
                            msg: 'Password updated'
                        });
                    });

                }).catch(error => { //in case of the hashing the password there is some error occurred
                    return res.status(400).send({
                        error: 'Some error occured!'
                    });
                });

            }).catch(error => { //in case of finding the user some error occured or no user is present
                return res.status(500).send({
                    error: 'Username not found!'
                });
            });

        } catch (error) {
            return res.status(404).send({
                error
            });
        }; //in case of  any error



    } catch (error) {
        return res.status(401).send({
            error
        });
    }

}