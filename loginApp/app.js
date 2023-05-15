//packages required 
const express = require('express'),
    mongoose = require('mongoose'),
    port = 4000,
    app = express(),
    bcrypt = require('bcrypt'),
    passport = require('passport'),
    auth = require('./auth');

//required files which are local
const users = require('./models/user'),
    userRouter = require('./routes/user'),
    userControl = require('./controllers/userControl');

var session = require('express-session'); //this is for keeping track user sessions
//for mongoose connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/loginDB', {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to the database successfully.');
}).catch((error) => {
    console.log('There was an error connecting to the database.');
});


// app.use('/public',express.static(pathname));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: false
}));

app.get('/', (request, response) => {
    response.send(`<h3>Welcome to the homepage Bro!</h3>`);
});

//for using the session in express
app.set('trust proxy', 1) //this is for proxy or idk
app.use(session({
    secret: "idonthaveanysecretkeyssoiamnotwritinganyonehere",
    saveUninitialized: true,
    cookie: {
        secure: false
    },
    resave: false
}));

app.use(passport.initialize()); //for using the passport package
app.use(passport.session());



app.use('/user', userRouter);


app.listen(port, () => {
    console.log(`Server running on the port: ${port}`);
});