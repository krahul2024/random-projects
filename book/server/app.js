const express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    cookie_parser = require('cookie-parser');
const app = express(),
    User = require('./models/user.js')
app.use(cookie_parser()) 
const jwt_secret = 'thisisrandomsecretforthejsonwebtokenandonlyiknowthis';
app.use(cors({

    credentials: true,
    origin: 'http://localhost:3000'

})); //for using cors

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/bookDB', {
        useNewUrlParser: true
    }).then(() => console.log('Connected successfully to the database!'))
    .catch((err) => console.log(`There was an error connecting to the database ${err}`))

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookie_parser());

app.get('/', (req, res) => {
    res.json('testing ok!');

});


app.post('/register', async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    console.log(req.body);

    //creating a new user
    try {
        const user = await User.create({
            name,
            email,
            password
        });

        console.log(user);
        res.json(user);

    } catch (err) {
        console.log('There was an error registering you!');

        res.status(422).json(err);
    }
});

app.post('/login', async (req, res) => {
    console.log(req.body);
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            console.log('No such user');
            res.status(401).send("This user doesn't exist");
        } else if (user.password != password) {
            console.log('You piece of shit');
            res.status(403).send('Incorrect Password!');
        } else {

            console.log('Love You!');
            jwt.sign({
                email: user.email,
                id: user._id
            }, jwt_secret, {}, (error, token) => {
                console.log(token);
                if (error) throw error;
                res.cookie('token', token).json(user);
            }); //signing a token on successful login
        }

    } catch (error) {
        res.status(404).json(error);
    }

})


app.get('/profile',(req, res) => {
    //getting information from cookies
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwt_secret, {},async  (err, user) => {
            if (err) throw err;
           	const {name,email,_id} = await User.findById(user.id);
            res.json({name,email,_id});
        })

    } else res.json(null);

})



app.listen(3001, () => console.log(`Server running on the port: ${3001}`))