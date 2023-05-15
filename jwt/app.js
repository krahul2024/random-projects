import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import user_router from './routes/user.js'
import body_parser from 'body-parser'
dotenv.config();
const app = express() , PORT = process.env.PORT 

app.use(express.urlencoded({extended:true})) //for using json format and sending messages and data in json format
app.use(express.json())  // for using json format and other stuff related to idk



mongoose.set('strictQuery' , false)
mongoose.connect('mongodb://localhost/jwtDB' , { useNewUrlParser: true })
	.then(() => console.log(`Connected to database successfully...`))
	.catch((error) => console.log(`There was an error connecting to the database. ${error}`))

app.get('/' , (req , res) => {
	res.send('this is homepage....')
})



app.use('/user' , user_router) 

app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`))