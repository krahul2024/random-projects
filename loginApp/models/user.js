const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	name: String,
	username: String,
	password: String,
	creationTime: {
		type: Date,
		default: Date.now
	},
	email: String
});

module.exports = mongoose.model('user', userSchema);