const express = require('express');
const router = express.Router();
const Article = require('../models/articles')
//displaying all articles in this page
router.get('/', (request, response) => {
	Article.find((error,result)=>{
		if(error)response.send('<h3>There was an error from server side, Please try again or wait till it is resolved.</h3>')
		response.render('./pages/articles/allArticles',{article:result});
	})
})
//when a new article is to be added, redirecting to the new article page
router.get('/new', (request, response) => {
	response.render('./pages/articles/new', {
		article: new Article()
	})
})
//redirecting to the added article page
router.get('/:_id', async (request, response) => {
	//checking if we have any article with the  id in request 
	let article = await Article.findById(request.params._id);
	//if there is no article matching with the id in request the we redirect to all articles page
	if (article == null) response.redirect('/');
	//if there is an article with the id similar to the id in request then we display that article
	else response.render('./pages/articles/show.ejs', {
		article: article
	});
})
//for editing the article and showing the changes after edition of the article, in case there is an error then 
// saving the contents of the previous article and not discarding the changes
router.get('/edit/:_id', async (request, response) => {
	//getting the contents of the article
	let article = await Article.findById(request.params._id);
	//checking if the article exists or not? if it doesn't then redirect to all articles page
	if (article == null) response.redirect('/articles');
	//if the article exists then we modify it as per recieved data and then save it using the method override in router.put method below
	response.render('./pages/articles/edit', {
		article: article
	});
})
router.post('/', async (request, response) => {
	//processing the data recieved from form for new article
	let article = new Article({
		problemTitle: request.body.title,
		problemStatement:request.body.statement,
		problemApproach: request.body.approach,
		problemSolution: request.body.solution,
		problemCode: request.body.code
	});
	// console.log(article);
	try {
		//saving the article and when saved , redirecting to the newly saved article page
		article = await article.save();
		response.redirect(`/articles/${article._id}`);
	} catch (error) {
		//in case if the article is not saved then showing the form page along with the data this 
		// is in case of editing of the article
		response.render('./pages/articles/new', {
			article: article
		});
	}
})
//for edition of the article using the method override package , while using this package we use .put instead 
//of .post for the edition purpose and this also requires a get route which is written above with path /edit/:_id
router.put('/:_id', async (request, response) => {
	let article = await Article.findById(request.params._id);
	article.problemTitle = request.body.title;
	article.problemStatement=request.body.statement;
	article.problemApproach = request.body.approach;
	article.problemSolution = request.body.solution;
	article.problemCode = request.body.code;
	// article.problemTags = request.body.topics;

	try {
		article = await article.save();
		// console.log(article);
		response.redirect(`/articles/${article._id}`);
	} catch (error) {
		// console.log(error)
		response.render('./pages/articles/edit', {
			article: article
		})
	}
})
//for deletion of the article using the method override

module.exports = router;