//this file is for schema or structure of the articles which we will be writing 
const mongoose=require('mongoose');
//schema for our articles ,like what are its contents and structure
const articleSchema= new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	description:{
		type:String
	},
	markdown:{
		type:String,
		required:true
	},
	creationTime:{
		type:Date,
	default:Date.now
	}
});
//exporting the schema and the table will be named article
module.exports=mongoose.model('Article',articleSchema);