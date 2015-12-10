//server.js
var port = process.env.PORT || 8080;

//load dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path    = require("path");

app.use(bodyParser.urlencoded({extended: true})); //to read the body in a friendly way
app.use(bodyParser.json()); // to respond with a json format

//setup DB connection
mongoose.set('debug', true);
mongoose.connect('mongodb://talk:talk2015@ds027415.mongolab.com:27415/garage_sale');
mongoose.connection.on('error', function(err){console.log(err);})

//load models
var User = require('./app/models/user');
var Garage = require('./app/models/garage');

//setup router
var router = express.Router();
//router.get('/', function (req, res){
//	res.json({'message': 'Json is running'});
//});

router.route('/users')
		
	.get(function(req, res){
		User.find(function(err, users){ //return an error or users
			if (err){
				res.send(err);
			}
			res.json(users);
		});
	})

    .post(function(req, res){
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        
        user.save(function(err){
            if (err){
                res.send(err);
            }
            
            res.json(user);
        });
    });

router.route('/users/:user_id')

    .get(function(req, res){
        User.findById(req.params.user_id, function(err, user){
            if(err){
                res.send(err);
            }
    
            res.json(user);
        });
    });


//Garage
router.route('/garages')
		
	.get(function(req, res){
		Garage.find(function(err, garages){ //return an error or users
			if (err){
				res.send(err);
			}
			res.json(garages);
		});
	})

    .post(function(req, res){
        var garage = new Garage();
        garage.province = req.body.province;
        garage.country = req.body.country;
        garage.address = req.body.address;
        garage.contactName = req.body.contactName;
        garage.phoneNumber = req.body.phoneNumber;
        garage.date = req.body.date;
        garage.time = req.body.time;
        
        garage.save(function(err){
            if (err){
                res.send(err);
            }
            
            res.json(garage);
        });
    });


//launch application
app.get('/', function(req, res) {
    res.type('.html');   
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.use('/api', router);
//app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));
app.use("/css",  express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/data", express.static(__dirname + '/public/js/data'));
app.use("/google_maps", express.static(__dirname + '/public/js/data/google_maps'));
app.use("/images", express.static(__dirname + '/public/images'));
app.use('/views', express.static(__dirname + '/views'));



app.listen(port); //using express to listen to incoming requests
console.log('NodeJs is running on port: ' + port);