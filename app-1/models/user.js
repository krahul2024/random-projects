import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		min: 2,
		max: 50
	},
	lastName: {
		type: String,
		required: true,
		min: 2,
		max: 50
	},
	email: {
		type: String,
		required: true,
		max: 50,
		unique: true
	},
	password: {
		type: String,
		min: 5,
		required: true
	},
	picturePath: {
		type: String,
		default: ''
	},
	friends: {
		type: Array,
		default: []
	},
	location: String,
	occupation: String,
	viewedProfile: Number,
	impressions: Number
}, {
	timestamps: true //this is for getting the dates when created and updated and others
});
const user = mongoose.model('user', userSchema);
export default user; //exporting the schema for user 