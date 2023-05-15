import mongoose from 'mongoose'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import randomstring from 'randomstring'

const create_token = async ( id ) => {
	try{

		const token = await jwt.sign({_id:id} , "thisismysecretkeyanditisvisibletoeverybody")
		return token 
	}
	catch (error) {
		return res.status(400).send({error})
	}
}

const send_mail = async (name , email , token) => {
	console.log(email , name , token)
	try{
		const transporter = await nodemailer.createTransport({
			host:'smtp.gmail.com',
			port:587,
			secure:false,
			requireTLS:true,
			auth:{
				user:"sandipkumar2024@gmail.com",
				password:"Rahulis2024%smart"
			}
		})

		// console.log(transporter)

		const mail_options = {
			from : "sandipkumar2024@gmail.com",
			to : email,
			subject : 'For resetting the password..',
			html: `<p> Hi! ${name}, please enter the otp for resetting your password...</p>`
		}

		transporter.sendMail(mail_options , function(error , result) {
			if(error) console.log(error)
			else console.log("Mali has been sent...",result.response)
		})
	}
	catch(error) {
		console.log(error.message)
	}
}

//for logging in the user body contains username,password
export const user_login = async (req , res) => {
	try{

		let { username } = req.body 
		let user = await User.findOne({username}) 
		// console.log(user) 
		if(!user) return res.status(400).send({
			msg : "This user does't exist. Try registering"
		})
		else if(user.password != req.body.password) return res.status(403).send({
			msg : "Enter correct password, you piece of shit..."
		})
			//in case of successful login

		const token = await create_token( user._id )// creating the token for further uses
		return res.status(200).send({
			success : true,
			msg : `Welcome ${user.name}`,
			user , token 
		})

	}
	catch (error) {
		return res.status(400).send({
			success : false,
			msg:"Some error occurred! Please try again..",
			error
		})
	}
}

//body contains username,name,password
export const user_register = async (req , res) => {
	try {
		console.log(req.body)

		const {username, email, password , phone , name, type } = req.body
		let user = await User.findOne({username}) 

		if(user) return res.status(400).send({
			success : false,
			msg : "This user is already registered with us, Try logging in or use another username.."
		})

		user = new User({
			username, email, password, phone, name, type
		}) 
		user = await user.save() 

		if(!user) return res.status(400).send({
			success : false,
			msg : "There was an error registering you! Please try again later.."
		})

		return res.status(200).send({
					success : true,
					msg : "Registration successful!"
				})

	}
	catch (error) {
		console.log(error) 
		return res.status(400).send({
			success : false,
			msg:"Some error occurred! Please try again..",
			error
		})
	}
}

export const update_password = async (req , res) => {
	const { username, password } = req.body 
	try {
		let user = await User.findOne({username})
		if(!user) return res.status(400).send({
			success: false,
			msg:"This user doesn't exist",
		})
		user.password=password;
		user = await user.save() 

		return res.status(200).send({
			success: true,
			msg:"Password updated successfully",
			user
		})

	}
	catch(error) {
		return res.status(400).send({
			success: false,
			msg: "There was an error!",
			error
		})
	}
	
}


//these two functions forgot and reset are not complete 
export const forgot_password = async (req , res) => {
	const { email } = req.body 
	// console.log(email)
	try {

		let user = await User.findOne({email}) 

		if(!user) return res.status(400).send({
			success: false,
			msg:"This email is not registered with us.."
		})
		const random_string = await randomstring.generate()

		user.token = random_string
		user = await user.save() //updating the user with token value
		// console.log(user)

		await send_mail(user.name , user.email , user.token) 

		return res.status(200).send({
			success:true,
			msg:"OTP sent successfully to your email, Please enter it to reset your password",
		})
	}
	catch (error) {
		return res.status(400).send({
			success:false,
			msg:"There was an error, Please try again.",
			error
		})
	}

}

export const reset_password = async (req , res) => {

	const password = req.body.password

	try{
		const token = req.query.token 
		const result = await User.findOne({token})

		if(!token || token != result.token) return res.status(400).send({
			success: false,
			msg:"entered otp is not registered with us.."
		})

		result.password = password 
		result = await result.save()

		return res.status(200).send({
			success:true,
			msg:"you can login now"
		})
		

	}
	catch (error) {
		return res.status(400).send({
			success:false,
			msg:"There was an error, Please try again.",
			error
		})
	}

}

