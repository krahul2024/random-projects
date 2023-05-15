const mongoose=require('mongoose');
//this is the schema for dynamic navigation bar and for that we will be using the database for
//storing the names and links to store the details of the navigation bar and other contents are explained in the schema itself
const navbarSchema=mongoose.Schema({
	brandName:String,//this is the name of the website
	brandIconUrl:String,//this is in case if we want to attach an image alongwith the header or the name of the website
	links:[{//this is an array for the various links as we will be having more than one links in our navigation bar 
			label:String,
			url:String,
		}]
});
//exporting the model for whoever wanting to use and for doing this we have to 
//first parameter is the name of collection(table in case of sql), and second parameter is the schema
module.exports=mongoose.model('navbar',navbarSchema);