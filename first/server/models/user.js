import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
let date = new Date().toLocaleString("en-In");
// console.log(date)
const userSchema = new mongoose.Schema({
	name:{
		type: String,
		required : true
	},
	address:{
		type:String
	},
	phone:{
		type: String
	},
	email: {
		type:String
	},
	joinedAt:{
		type:String,
	default:date
	},
	username:{
		type:String,
		required:true,
		unique:true
	},
	password: {
		type: String,
		required:true
	},
	profile_image:{
		type:String
	},
	tokens : [{
		token : {
			type : String ,
			required : true
		}
	}]
})

userSchema.methods.generateAuthToken = async function () {
	try {
		console.log(process.env.secret_key)
		let token = jwt.sign({ _id : this._id } , process.env.secret_key) //token generation for this id
		this.tokens = this.tokens.concat({ token : token }) 
		await this.save() 
		return token 
	}
	catch (error) {
		console.log(error) 
	}
}

export default mongoose.model('User',userSchema) 