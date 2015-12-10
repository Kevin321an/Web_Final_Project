//js/app/models/garage.js

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GarageSchema = new Schema({ //internally
    province: String,
    country: String,
    address: String,
	contactName: String,
	phoneNumber: String,
    date: String,
    time: String,
    items: [String]
});

module.exports = mongoose.model('Garage', GarageSchema); //externally