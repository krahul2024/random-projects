const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
//this is for requiring mongoose as we will be using mongodb for database purposes
const mongoose = require('mongoose');
//in this app.js we have to use the router which we have created in articles.js and 
// for doing so we have to require it here
const articleRouter = require('./routes/articles');
const article=require('./models/articles.js');
//this package method override is used here for deletion purpose of any article and 
//to use this we have set up a router.delete() in the articles.js and after that we can override the get and
//post methods and delete in the ejs file itself ,this package simplifies the deletion process in the web
const methodOverride= require('method-override');
//this is for connection to the database when using mongoose and the name of the database is blogDB
mongoose.set('strictQuery', false); //this is for suppressing the deprecation warnings
mongoose.connect('mongodb://localhost/blogDB', {
	useNewUrlParser: true
}).then(() => {
	console.log('Connected to the database successfully.');
}).catch((err) => { //for catching error when there is failure
	console.log("Error connecting to the database.");
});
//this is for using the method override package i don't know much 


//we have to tell about using the articleRouter and for doing that we 
// have to tell where it is going to be based on basically the path for rendering


// this is for telling the app.js to use the article database and other stuff
app.use(express.urlencoded({
	extended: false
}));
//this is for setting the view engine 
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.get("/", async (request, response) => {
	//this finds all the articles
	articles =await article.find();
	response.render('pages/index.ejs',{articles:articles})
})

app.use('/articles', articleRouter);

//this is for generating a response when the requested page doesn't exist
app.get('*', (request, response) => {
	response.send(`<h3>The page you requested does not exist. <br> LOL.</h3>`)
})

//this is for running the website to some port in this case it is 4000
app.listen(port, () => {
	console.log(`Server running on the port : ${port} `);
})