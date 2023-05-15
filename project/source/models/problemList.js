const mongoose=require('mongoose');
//this is like I have to display names of various topics and also have to access them so this is an array of the 
//name of topics and their corresponding pages 
const problemListSchema=mongoose.Schema({
	list:[{
		name:String,
		url:String
	}]
});
module.exports=mongoose.model('problemList',problemListSchema);