const express = require('express');
// const mongoose=require('mongoose');
const router = express.Router();
const problems = require('../models/problems')
const problemLists = require('../models/problemList')

router.get('/', (request, response) => {
	problemLists.find((error, result) => {
		if (error) response.send(`<h3>The page is currently under maintenance, see you soon.</h3>`)
		else {
			let topicList = result[0];
			// console.log(topicList.list[0].name)
			response.render('pages/problems/problems', {
				topicList: topicList
			});
		}
	})
	// response.render('pages/problems/problems');
})

//for redirecting to the page for a specific topic, let's say we are going to the page for all sorting problems
//then it is the id of the topic from sorting it will be something like website/problems/id_of_sorting_in_topicList
//based on this we have to match this with the topic available in problems collection and then display all the 
//problems which have the sorting tag
router.get('/new', (request, response) => {
	problemLists.find((error, result) => {
		if (error) response.send(`<h3>The page is currently under maintenance, see you soon.</h3>`)
		else {
			let topicList = result[0];
			// console.log(topicList.list[0].name)
			response.render('pages/problems/newProblem', {
				topicList: topicList
			});
		}
	})
})
router.get('/:_id', (request, response) => {

})

router.post('/', async (request, response) => {
	// creating the problems object using the values recieved from post request 
	console.log(request.body.topics);
	let problem = new problems({
		problemName: request.body.title,
		problemTopics: request.body.topics,
		problemSolution: request.body.solution,
		problemLink: request.body.link
	});
	console.log(problem);
	//saving the problem to the problems list
	try {
		problem = await problem.save();
		console.log(problem);
		response.redirect('/problems');
	}catch(error) {
		console.log(error);
		response.redirect('/problems/new');
	}
})



module.exports = router;