//js/app/models/item.js

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema({ //internally
	garageSaleId: String,
    title: String,
	description: String,
    price: Number,
    image: String
});

module.exports = mongoose.model('Item', ItemSchema); //externally