//server.js
var port = process.env.PORT || 8080;

//load dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var path    = require("path");

var bodyParser   = require('body-parser');
var session = require('express-session');//calling sessions


app.use(bodyParser.urlencoded({extended: true})); //to read the body in a friendly way
app.use(bodyParser.json()); // to respond with a json format
app.use(session({secret:"session1",resave:false, saveUninitialized:true}));//Using sessions here with its unique id

//setup DB connection
mongoose.set('debug', true);
mongoose.connect('mongodb://talk:talk2015@ds027415.mongolab.com:27415/garage_sale');
mongoose.connection.on('error', function(err){console.log(err);})

//load models
var User = require('./app/models/user');
var Garage = require('./app/models/garage');


//setup router
var router = express.Router();



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
		Garage.find(function(err, garages){ //return an error or garages
			if (err){
				res.send(err);
			}
			res.json(garages);
		});
	})

    .post(function(req, res){
        var garage = new Garage();
        garage.latitude = req.body.latitude;
        garage.longitude = req.body.longitude;
        garage.title = req.body.title;
        garage.location = req.body.location;
        
        //template values
        garage.image = req.body.image;
        garage.details_url = req.body.details_url;
        garage.ribbon_mark_text = req.body.ribbon_mark_text;
        garage.ribbon_mark_class = req.body.ribbon_mark_class;
        garage.template = req.body.template;
        garage.icon = req.body.icon;
        garage.options = req.body.options;
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

router.route('/login')
.get(function (req, res) {
        User.find(function (err, users) { //return an error or users
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    })
    .post(function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        User.findOne({
            email: email,
            password: password
        }, function (err, user) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }
            if (!user) {
                return res.status(404).send();
            }
            req.session.user=user;//Saving session in user Object
            res.json(user);
             //console.log("User Login");
            return res.status(200).send();
        })
    });

router.get('/session',function(req,res){
    if(!req.session.user){                          //Checking users sessions
        return res.status(401).send();
    }
    return res.status(200).send("Welcome");         //return Something if user passed login..session created
});

router.get('/logout',function(req,res){             //Destroying Sessions
    req.session.destroy();
    return res.status(200).send();
});

//launch application
app.get('/', function(req, res) {
    res.type('.html');   
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.use('/api', router);
app.use(express.static(path.join(__dirname, 'public')));
app.use("/css",  express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/data", express.static(__dirname + '/public/js/data'));
app.use("/google_maps", express.static(__dirname + '/public/js/data/google_maps'));
app.use("/images", express.static(__dirname + '/public/images'));
app.use('/views', express.static(__dirname + '/views'));



app.listen(port); //using express to listen to incoming requests
console.log('NodeJs is running on port: ' + port);