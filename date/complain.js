import mongoose from 'mongoose'  
const complainSchema = new mongoose.Schema({
	issue:String,
	by:String,
	against:String ,
	comp_date:{
		type:String,
	default:Date() 
	},
	date:{
		date_one:String,
		date_two:String,
		date_three:String,
		fixed_by:String
	},
	members:[{
		faculty:String
	}]
})

export default mongoose.model('Complain' , complainSchema) 