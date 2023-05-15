const mongoose=require('mongoose');
//this is the schema for dynamic navigation bar and for that we will be using the database for
//storing the names and links to store the details of the navigation bar and other contents are explained in the schema itself
const sliderSchema=mongoose.Schema({
	sliderImageUrl:String,
	sliderLabel:String,
	sliderLabelInformation:String
});
//exporting the model for whoever wanting to use and for doing this we have to 
//first parameter is the name of collection(table in case of sql), and second parameter is the schema
module.exports=mongoose.model('slider',sliderSchema);