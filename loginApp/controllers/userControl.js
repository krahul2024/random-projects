const express = require('express');
const users = require('../models/user');
const bcrypt = require('bcrypt');
// var session=require('express-session');//this is for keeping track user sessions
const addUser = async (request, response) => {
	// console.log('this is from the user control file')
	console.log(request.body);
	let pass = await bcrypt.hash(request.body.password, 10); //hashing the password recieved 
	let user = new users({ //creating a new user from provided information while signing up
		name: request.body.name,
		email: request.body.email,
		password: pass,
		username: request.body.username
	});
	try {
		user = await user.save();
		response.redirect('/user/login');
	} catch (error) {
		console.log(error);
	}
	console.log(user);
	// response.render('register');
}

//to process the login part of the code
const loginCheck = async (request, response) => {
	let user = await users.findOne({
		username: request.body.username
	}, {});
	console.log(user)
	//if there exists an user with that username then we will check for the password
	if (user) {
		let isValid = await bcrypt.compare(request.body.password, user.password);
		if (isValid) {
			sess = request.session;
			sess.name = user.name;
			sess.email = user.email;
			sess.username = user.username;
			// console.log(sess)
			response.redirect('/user')
		} else response.redirect('/user/login');
	} else response.redirect('/user/login')
}


//to process the user logout
const userLogout = (request, response) => {
	// console.log(request.session)
	request.session.destroy((error) => {
		if (error) console.log(error);
		else response.redirect('/user')
	})
}



module.exports = {
	addUser,
	loginCheck,
	userLogout
}