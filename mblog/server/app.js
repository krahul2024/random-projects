import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRouter from './routes/userRoute.js'
dotenv.config();//for using variables from .env file
const app = express(), PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));

//connection to the database
mongoose.set('strictQuery' , false);
mongoose.connect('mongodb://localhost/mblogDB', { useNewUrlParser : true })
.then(() => console.log(`Successfully connected to the database!`) )//in case of successfull connection to the database
.catch((error) => {
	console.log(`There was an error connecting to the database. ${error}`);//in case of some error during connection to the databaase
});


app.use('/user',userRouter);//for using user route

app.listen(PORT, () => console.log(`Server running on the port: ${PORT}`));