import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import users from '../models/user.js'

//for registering the user here asynchronous stuff all around

export const register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			picturePath,
			friends,
			location,
			occupation
		} = req.body;
		//hashing the password for security purposes
		const salt = await bcrypt.genSalt();
		const passHash = await bcrypt.hash(password, salt);
		//creating new user to add it to the database when registering 
		const newUser = new users({
			firstName,
			lastName,
			email,
			password: passHash,
			picturePath,
			friends,
			location,
			occupation,
			viewedProfile: Math.floor(Math.random() * 1000),
			impressions: Math.floor.(Math.random() * 1000)
		});

		const savedUser = await newUser.save(); //saving the user
		res.status(201).json(savedUser); //creating a json format so that frontend can understand this
		// and all this is being done on successfull registration of the user

	} catch (err) {
		res.status(500).json({
			error: err.message
		}); //in case of any error frontend recieves this error message with this status code
	}
}

//for logging in the user

export const login = async (req, res) => {
	try {

		const {
			email,
			password
		} = req.body;

		const user = await users.findOne({ //looking for user with email
			email: email
		});

		if (!user) return res.status(400).json({ //in case if there is no user with entered email 
			msg: 'User does not exist!'
		});

		const isCorrect = await bcrypt.compare(password, user.password);
		if (!isCorrect) res.status(400).json({ //in case of invalid password
			msg: 'Wrong password!'
		});

		const token = jwt.sign({ //signing jwt tokens for user with some key or anything
			id: user._id
		}, process.env.JWT_SECRET);
		delete user.password; //deleting password of the user so it doesn't get sent to frontend

		res.status(200).json({//tokens are used for logging in and other stuff 
			token,
			user
		});

	} catch (err) {
		res.status(500).json({
			error: err.message
		}); //in case of errors
	}
}