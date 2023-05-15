//-------------------import of packages and othen constant variables-----------------------
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/route.js'
const app = express(),
	port = 4400;
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); //less hackers know about our stock

app.get('/', (req, res) => {
	res.status(201).json('Home Get Request.');
});



//----------------routes---------------------
app.use('/api',router);//for using the api route from another file as you might know

//----------------connection to database stuff and listening to the port etc.---------------------------
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/againDB').then(() => {
	console.log('Connected to the database successfully!');
}).catch((error) => console.log(`There was an error connecting to the database!\n The error is ${error}`));

app.listen(port, () => console.log(`Running on the port:${port}`));