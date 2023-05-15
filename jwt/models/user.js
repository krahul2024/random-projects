import mongoose from 'mongoose'

const user_schema = new mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	},
	username : {
		type : String,
		required : true,
		unique : true
	},
	phone : String,
	email : {
		type: String,
		unique: true
	},
	type : Number,
	token : {
		type: String,
	default: ""
	}
})

export default mongoose.model('User' , user_schema) 