import mongoose from 'mongoose' //for database related queries
import User from '../models/user.js' //for getting schema of user model

export const signupUser = async ( req , res ) => {

	try {

		const {name, username, password} = req.body;
		const user = new User({
			name, username , password
		});
		user = await user.save(); //saving newly created user to the database
		return res.status(200).json({msg:'Registration successful!'}); //sending to fronted on successful registration of user
	
	} catch (error) {
		return res.status(500).json({msg:'There was an error registering you! You may try with another username.'});
	}

}