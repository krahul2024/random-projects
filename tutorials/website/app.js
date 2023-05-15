const express = require('express');
const mongoose = require('mongoose');
const navbar = require('./models/details.js') //for navigation bar model
const slider = require('./models/slider.js') //for slider model
const app = express();
//this is in case if the said port is available then use that otherwise use any available port
const port = process.env.PORT | 4000;
//this is for using the router system and for doing  so we need to require it here
const router = require('./routes/main');
//this is for using the dynamic html and for which I am using the ejs templating engine
app.use(express.urlencoded({
	extended: false
}));
//this is for using the static files like css files and javascript files and to do that 
//in node we have to specify a directory as public and store all the static files in that public 
//directory and it is done below 
const publicPath = __dirname + '/public';
app.use('/public', express.static(publicPath));

//this is for using the mongodb and for which we have to connect here using mongoose
mongoose.set('strictQuery', false); //this is for prevention from the deprecation warning
mongoose.connect('mongodb://localhost/websiteDB', {
	useNewUrlParser: true
}).then(() => {
	console.log('Connected to the database successfully');

}).catch((error) => {
	console.log('There was an error connecting to the database');
})
//for storing and updating the details of the navigation bar dynamically
navbar.find((error, result) => {
	if (error) console.log('there was an error');
	else {
		//this line ensures that we  have only one item in the navbar at a given time 
		//if any update is needed then do in the navbar.create line , that will do all the needful
		if (result.length > 0) navbar.deleteMany({}, () => {
			// console.log('deleted');
		})
		navbar.create({
			brandName: ' My Website',
			brandIconUrl: './public/images/icon.png',
			links: [{
				label: 'Home',
				url: ''
			}, {
				label: 'Problems',
				url: ''
			}, {
				label: 'Explore',
				url: ''
			}, {
				label: 'Topics',
				url: ''
			}, {
				label: 'Contributors',
				url: ''
			}, {
				label: 'Sign In/Up',
				url: ''
			}]
		})
	}
});

//for slider information
slider.find((error, result) => {
	//in case if there is any error while fetching the data from the database
	if (error) console.log('There was an error.');
	else {
		//if there is some data present already then delete all of that and save pre-existing and some new data
		if (result.length > 0) slider.deleteMany({}, () => {
			//in case of successful deletion
			// console.log('Deleted');
		});
			//as we have deleted all the data now we have to create slider object using the previous and new ones if we wish to add
		slider.create([{
			sliderImageUrl: './public/images/image1.jpg',//image url
			sliderLabel: 'First Slide',//bold label or label topic
			sliderLabelInformation: 'This is the first slide of this website and it is dynamic.'//this is description for the bold label
		}, {
			sliderImageUrl: './public/images/image2.jpg',
			sliderLabel: 'Second Slide',
			sliderLabelInformation: 'This is the second slide of this website and it is dynamic.'
		},
		{
			sliderImageUrl: './public/images/image3.jpg',
			sliderLabel: 'Fourth Slide',
			sliderLabelInformation: 'This is the fourth slide of this website and it is dynamic.'
		}]);
	}
})
//this is for setting the viewing engine or templating engine here it is ejs
app.set('view engine', 'ejs');

app.get("/", (request, response) => {
	response.send('Nothing here go to the main page')
})



app.use('/main', router);



app.listen(port, () => {
	console.log(`Server running on the port: ${port}`);
});