const express = require('express');
const mongoose = require('mongoose');
const routerArticle = require('./routes/articles.js');
const routerProblem = require('./routes/problems.js');
const article = require('./models/articles.js');
const methodOverride = require('method-override');
const problems = require('./models/problems')
const problemLists = require('./models/problemList')

const app = express();
const port = 4000;
//this is for using the dynamic content property of ejs or making all the html pages dynamic
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/projectDB', {
	useNewUrlParser: true
}).then(() => {
	console.log('Connected to the database successfully');
}).catch((error) => {
	console.log('There was an error connecting to the database');
})
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({
	extended: false
}));
//to use the custom styles or some of the static files we have to use what i call path conversion
app.use('/public', express.static(__dirname + "/public"));
// this is for using the body parser for letting us use the json for some information which might recieve

app.get("/", (req, res) => {
	res.render('pages/homepage')
	// res.send("hello bro this is your first displaying for the project good luck with that if you can see this otherwise fix the error then good luck again/then.");
});
//adding the list of topics for the probems page , we can modify the list from here 
problemLists.find((error, result) => {
	if (error) response.send('Page currently under maintainence, See you soon.');
	else {
		// console.log(result[0]);
		//deleting so that there is no repetition of the topics so there remains only one list of topics 
		if (result.length > 0) problemLists.deleteMany({}, () => {
			// console.log('Deleted all the items');
		});
		//adding list of our desired topics and we can change the topics list whenever we want without any problems
		//given that we have already designed the respective pages for the mentioned topics
		problemLists.create({
			list: [{
				name: 'All Problems',
				url: ''
			}, {
				name: 'Sorting',
				url: ''
			}, {
				name: 'Searching',
				url: ''
			}, {
				name: 'Dynamic Programming',
				url: ''
			}, {
				name: 'Graphs',
				url: ''
			}, {
				name: 'Mathematics and Number Theory',
				url: ''
			}, {
				name: 'Linked List',
				url: ''
			}, {
				name: 'Binary Trees(All types)',
				url: ''
			}]
		});
	}
});

//using the articles for routing all the things related to articles in the project
app.use('/articles', routerArticle);
app.use('/problems', routerProblem);
//here writing for error 404 
// app.get('*',(req,res)=>{
// 	res.send('<h2>The page you requested does not exist. <br>Error 404 </h2>')
// });

//this is for listening on the port as of now the port is a specific number but during it should be changed as to accomodate any available connection
app.listen(port, () => {
	console.log(`Running on the port: ${port}.`);
});
