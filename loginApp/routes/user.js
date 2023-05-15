const express = require('express'),
	router = express.Router(),
	bcrypt = require('bcrypt'),
	passport = require('passport'),
	auth = require('../auth');

const users = require('../models/user'),
	userControl = require('../controllers/userControl');

var session = require('express-session');

router.get('/', (request, response) => {
	let value = request.session;
	// console.log(value)
	response.render('home', {
		value: value
	})
	// response.redirect('/user/login')
})

router.get('/login_using_google',
	passport.authenticate('google', {
		scope: ['email', 'profile']
	}));

router.get('/login_using_google/callback',
	passport.authenticate('google', {
		successRedirect: '/user', //in case of successful login we are redirecting user to this page
		failureRedirect: '/user/failure' //in case of failure we are redirecting user to again sign using their google account
	}));

//in case of failure to login send this message
router.get('/failure', (request, response) => {
	response.send('something went wrong');
});
//to make sure that user accesses this page only in case of successfull login
// router.get('/protected', isLogged, (request, response) => {
// 	// console.log(request.body)
// 	// console.log(request.session.passport)
// 	let user = request.session.passport.user,
// 		value={
// 			name: user.displayName,
// 			email: user.email,
// 			image: user.picture
// 		}
// 		// console.log(user)
// 	response.render('home', {
// 		value: value
// 	});
// });



router.get('/register', (request, response) => {
	response.render('register')
});

router.get('/login', (request, response) => {
	response.render('login')
})
//for logging out an user
router.get('/logout', userControl.userLogout);



//for post while logging in an user
router.post('/loginUser', userControl.loginCheck)
//for post while adding an user
router.post('/registerUser', userControl.addUser);



module.exports = router;

//learn how to use connect-flash and multer