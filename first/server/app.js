import express from 'express'
import env from 'dotenv'
import mongoose from 'mongoose'
import User from './models/user.js'
import userRouter from './routes/user.js'
import cookie_parser from 'cookie-parser'

const app = express() , PORT = process.env.PORT || 5000
app.use(cookie_parser())
env.config() //for using .env file and its contents 
app.use(express.urlencoded({extended:true})) //for using json format and sending messages and data in json format
app.use(express.json())  // for using json format and other stuff related to idk


//connecting to the database
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost/firstDB',{ useNewUrlParser : true })
	.then(() => console.log(`Connected to the database successfully!`))
	.catch((error) => {
		console.log(`There was an error connecting to the database. ${error}`) // printing the error
	})


app.use('/user' , userRouter)


app.listen(PORT, () => console.log(`Server is running on the PORT: ${PORT}`))