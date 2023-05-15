import mongoose from 'mongoose'
import Complain from './complain.js'
const userSchema = new mongoose.Schema({
	name:String,
	username:String,
	password:String,
	complains:[{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:Complain 
		}
	}]
})

export default mongoose.model('User' , userSchema) 