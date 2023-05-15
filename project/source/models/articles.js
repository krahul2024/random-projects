const mongoose=require('mongoose');
const articleSchema=mongoose.Schema({
	problemTitle:String,//for the title of the problem
	problemStatement:String,
	problemCreationTime:{
		type:Date,
	default:Date.now//adding the date of the creation of the article as we are not asking the author to provide a date 
	},
	problemTags:[{//getting the types of the topics which will help us in identifying problems by 
		name:String//their topic like a problem which involves both dynamic programming and graphs can be shown in both the topic list
	}],
	problemApproach:String,
	problemSolution:String,
	problemCode:String//this will need some work as at this point I don't know how to display code in a page
});
//considering the topics fiasco we can use the split method of the js for removing the commas and then we will re
module.exports=mongoose.model('article',articleSchema);
