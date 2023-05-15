import mongoose from 'mongoose'; //for creating the user schema which helps in idk
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
        unique: [true, "Username Exists"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "E-mail is Required"],
        unique: [true, "Someone is using this e-mail already"]
    },
    name: {
        type: String,
        // required: true
    },
    phone: { type: String },
    profile: { type: String }

});

const User=mongoose.model('User',userSchema);

export default User;