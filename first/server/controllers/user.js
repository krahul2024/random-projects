import mongoose from 'mongoose'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import cookie_parser from 'cookie-parser'

// registering the user :->  http://localhost:5000//user/register
// request body contains username , password , name
export const register_user = async (req , res) => {
	const {username, name , password} = req.body 
	// console.log(req.body);
	
	try {

		let user = await User.findOne({ username })
		if(user) return res.status(403).send({
			success:false,
			msg:"This username already exists "
		})
		user = new User({ name, username, password }) //creating an user if the entered username is already not registered
		user = await user.save() //saving newly created user
		// console.log(user)
		if(user) return res.status(200).send({
			success:true,
			msg : "Welcome to our website! Registration successful, You can login now.",
			user 
		})
		else throw error ;
	}
	catch (error) {
		return res.status(500).send({
			success:false,
			msg : " There was an error registering you. Try again later."
		})
	}
}

// logging an user :-> http://localhost:5000/user/login
//request body contains username, password
export const login_user = async ( req , res ) => {
	// console.log(req.body)
	const { username , password } = req.body

	try {
		const user = await User.findOne({ username }) //finding the user to check if it exists or not
		if(!user) return res.status(403).send({ 
			success:false,
			toPath:"/register",
			msg : "This username is not registered with us! Try registering.."})
		else if(user.password != password ) return res.status(403).send({
			success:false,
			toPath:"/login",
			msg : "Incorrect Password! Try again with correct password..."
		})

		const token = await user.generateAuthToken() //token generation 
		console.log(`Token : ${token}`) 
		//storing the token in cookie
		res.cookie("jwt_cookie" , token , {
			expires : new Date(Date.now() + 2589200000) ,
			httpOnly : true //for running on http also either it runs only on https if false
		})

		return res.status(200).send({
			success:true,
			toPath:"/profile",
			msg : `Welcome ${ user.name } !`,user
		})
	} 
	catch (error) {
		return res.status(404).send({ 
			success:false,
			toPath:"/login",
			msg : "There was an error logging you! Try again later...."
		})
	}

}

//updating the user information :-> http://localhost:5000/user/${username}/update
//req.body contains name, password, email , phone, profile image
export const update_user = async ( req , res ) => {

	const { username, name, phone , email , address } = req.body 
	// if(req.body)console.log(req.body)
	try{
		let user = await User.findOne({username}) 
		if(!user) throw err 
		user.name = name 
		user.phone = phone 
		user.email = email 
		user.address = address 
		user = await user.save()
		if(!user) throw err 
		res.status(200).send({
			success:true,
			msg:"User information updated successfully!",
			toPath:"/profile",
			user 
		})
	}
	catch(error) {
		res.status(403).send({
			success:false,
			msg:"There was an error while updating user information",
			toPath:"/update_profile"
		})
	}
	
}


//for resetting the password :-> http://localhost:5000/user/{username}/reset_password
//req.body contains password to be updataed and get username from parameters
export const reset_password = async (req, res) => {
	const { username } = req.params 
	const { password } = req.body
	try {

		let user = await User.findOne({username})
		user.password = password 
		user = await user.save() 
		// console.log(user) 
		if(user) return res.status(200).send({
			msg : 'Password reset successfully!',
			user : user
		})
		else throw error ;

	}
	catch (error) {
		return res.status(403).send({
			msg : "There was some problem. Please try again later!",
			error : error 
		})
	}
}