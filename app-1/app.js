import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import {
	fileURLToPath
} from 'url';
import {register} from './controllers/auth.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import {createPost} from './controllers/posts.js'
import {verifyToken} from './middleware/auth.js'

// configurations

const __filename = fileURLToPath(
	import.meta.url); //this is for getting file urls from the modules
const __dirname = path.dirname(__filename);

dotenv.config(); //for using .env files or some sensitive information which we have to hide when uploading the code

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
	policy: 'cross-origin'
}));
app.use(morgan('common'));
app.use(bodyParser.json({
	limit: "30mb",
	extended: true
}));
app.use(bodyParser.urlencoded({
	limit: "30mb",
	extended: true
}));
app.use(cors()); //this is for cross origin resource sharing policy
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); //for setting the static files

// file storage or for saving the uploaded files to this destination and with this filename as mentioned 
//below is the code from multer github instructions
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "public/assets");
	},
	filename: function(req, file, cb) {
		cb(null, file.originalName);
	}
});

const upload = multer({
	storage
}); //for saving the file which we will be uploading and we will be using this name upload for that purpose

//routes with files
app.post('/posts',verifyToken,upload.single('picture'),createPost); 
app.post('/auth/register',upload.single('picture'),register);//here we will upload picture 
//using middleware while registering to the location public/assets ,register is the controller function here


//mongodb setup : here we are setting offline mongodb 
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery',false);

mongoose.connect('mongodb://localhost/socialDB', {
	useNewUrlParser: true
}).then(() => {
	console.log('Connected to the database successfully.');
}).catch((err) => { //for catching error when there is failure
	console.log("Error connecting to the database.");
});


//routes
app.use('/auth',authRoutes);
app.use('/users',userRoutes);
app.use('/posts',postRoutes);


app.listen(PORT,()=> console.log(`Running on the port:${PORT}`));