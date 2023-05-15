const express = require('express');
const Article = require('./../models/articles');
const router = express.Router();

//this is for using the relative path basically whatever  is in the path of this router.get
//it will be relative to articles or something like this /articles/new
// console.log(__dirname);
router.get('/new', (request, response) => {
	response.render('pages/articles/new.ejs',{article:new Article()});
});
//this is in case if there is noting new then it will come here for above
//this is for edition in the  article
router.get('/edit/:_id' , async (request,response)=>{
	let article=await Article.findById(request.params._id);
	response.render('pages/articles/edit',{article:article});
});
//this is in case of new article creation 
router.get('/:_id', async (request, response) => {
	//this is for finding the article by id 
	let article=await Article.findById(request.params._id);
	if(article==null)response.redirect('/');//this is in case of no article or there is some error then we redirect to the home page
	//else doing this or displaying the article
	else response.render('pages/articles/show.ejs',{article:article});
});

//this is for sending the router to the homepage mentioned or the path mentioned and the async is as it is an asynchronous function
router.post('/', async (request, response) => {
	// creating an instance of the article schema
	let article = new Article({
		title: request.body.title,
		markdown: request.body.markdown,
		description: request.body.description
	});
	//saving the article or in technical terms , inserting the article into the blogDB and this await is used as this 
	//is using asynchronous function and hence we have to use the await also i don't have much idea.
	try {
		article = await article.save();
		//this is redirecting to the articles/id_of_the_article which is saved without errors 
		response.redirect(`/articles/${article._id}`);
	}
	//in case there is any error in saving the article then we will display to user that an error that there was an error while saving the data
	catch (error) {
		//this is in case of edit so we can retrieve old article 
		response.render('pages/articles/new',{article:article}); 
	}
});
//this is for edition of the article
router.put("/:_id",async (request,response)=>{

	let article = await Article.findById(request.params._id);
	article.title=request.body.title;
	article.description=request.body.description;
	article.markdown=request.body.markdown;
	try {
		article = await article.save();
		//this is redirecting to the articles/id_of_the_article which is saved without errors 
		response.redirect(`/articles/${article._id}`);
	}
	//in case there is any error in saving the article then we will display to user that an error that there was an error while saving the data
	catch (error) {
		//this is in case of edit so we can retrieve old article 
		response.render('pages/articles/edit',{article:article}); 
	}
});

//this is for the deletion of an article and this uses the method override package
router.delete('/:_id',async (request,response)=>{
		//searching by id of the article and deleting the corresponding article
		await Article.findByIdAndDelete(request.params._id);
		//sending to the home page after deletion of the article
		response.redirect('/');
	});
//we will be using this router in the homepage or app.js for routing to and from articles
//and to be able to do that we will have to export this router and below code is for 
//exporting this router

module.exports = router;