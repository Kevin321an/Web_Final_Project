//js/app/models/user.js

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({ //internally
	firstName: String,
	lastName: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema); //externally