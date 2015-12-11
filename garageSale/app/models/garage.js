//js/app/models/garage.js

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GarageSchema = new Schema({ //internally
    latitude: Number, 
    longitude: Number,
    title: String,
    location: String,
    image: String,
    details_url: String,
    ribbon_mark_text: String,
    ribbon_mark_class: String,
    template: String,
    icon: String,
    options: {
        bound: Boolean,
        tags: []
    },
	contactName: String,
	phoneNumber: String,
    date: String,
    time: String,
    items: [String]
});

module.exports = mongoose.model('Garage', GarageSchema); //externally