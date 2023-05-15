import express from 'express'
import mongoose from 'mongoose'
import Complain from './complain.js'
import User from './user.js'


const app = express() , PORT = 5000
app.use(express.urlencoded({extended:true})) //for using json format and sending messages and data in json format
app.use(express.json())  // for using json format and other stuff related to idk


//connecting to the database
const connection_uri = "mongodb+srv://sandipkumar2024:q79XDvGOuM7j7rjf@cluster0.rzeza5v.mongodb.net/?retryWrites=true&w=majority"
// mongoose.connect(connection_uri , {
// 	useNewUrlParser:true , useUnifiedTopology:true
// }).then(() => console.log('Connected to the database successfully'))
// 	.catch(error => console.log('There was an error connecting to the database. Please try again later.'))
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://0.0.0.0:27017/dateDB',{ useNewUrlParser : true })
	.then(() => console.log(`Connected to the database successfully!`))
	.catch((error) => {
		console.log(`There was an error connecting to the database. ${error}`) // printing the error
	})

app.get("/",(req,res) => {
	res.send("hello bro")
})

app.post('/add_user',async(req,res) => {
	const {name , username , password } = req.body  
	let user = new User({
		name , username , password
	})
	user = await user.save()  
	return res.send({
		msg:user?'successfully added the user':'There was an error adding the user.',
		user
	})
})

app.post('/add_complain' , async(req,res) =>{
	const {_id , issue } = req.body.user  
	let complain = new Complain({
		by: _id , issue 
	})
	complain = await complain.save()  
	return res.send({
		msg:complain?'successfully added the complain':'There was an error adding the complain.',
		complain
	})
})

// this is for fixing the date by each of the faculty member

app.post('/fix_date' , async(req,res) => {
	const {date} = req.body  
	let complain = await Complain.findOne({_id:req.body.complain._id})
	complain.date = date  
	complain = await complain.save()
	//now send mail to every faculty member who is concerned with this complain
	return res.send({
		msg:complain?'successfully fixed meeting date':'There was an error fixing meeting date',
		complain
	})

})


app.listen(PORT, () => console.log(`Server is running on the PORT: ${PORT}`))