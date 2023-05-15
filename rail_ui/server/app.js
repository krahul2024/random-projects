const express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	PORT = 5000;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/railDB', {
	useNewUrlParser: true
}).then(() => {
	console.log('Connected to the database successfully');
}).catch((error) => {
	console.log(`There was an error connecting to the database ${error}`);
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({
	extended: false
}));

app.get('/',(req,res)=>{
	res.send('hello this is homepage');
})





app.listen(PORT,()=> console.log(`Server Running on the port : ${PORT}`));