const mongoose=require('mongoose');
const problemSchema=mongoose.Schema({
	//structure of the problem: name of the problem,topics which it  concerns,link for the problem ,
	//solution to the problem if there is any which is link to the article 
	problemName:String,
	problemTopics:[],
	problemLink:String,
	problemSolution:String
});
module.exports=mongoose.model('problem',problemSchema);
module.exports=mongoose.model('problem',problemSchema)