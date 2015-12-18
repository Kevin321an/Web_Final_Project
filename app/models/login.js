//js/app/models/login.js

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LoginSchema = new Schema({ //internally
    email: String,
    password: String
});

module.exports = mongoose.model('Login', LoginSchema); //externally