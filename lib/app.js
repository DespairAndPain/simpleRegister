var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var mongoose = require('mongoose');	
var app = express();


var urlencodedParser = bodyParser.urlencoded({ extended: false })
mongoose.connect('mongodb://localhost/ridero');
var model = require('../model/users');

app.post('/register/', urlencodedParser, function (req, res) {

	if (!req.body) return res.sendStatus(400)
	
	var rightEmail = false;
	var uEmail = req.body.email;
	var uUsername = req.body.username;
	var uSurname = req.body.surname;

	if (validator.isEmail(uEmail)) {
		rightEmail = true;
	}
	var db = mongoose.createConnection('mongodb://localhost/ridero');
	//db.on('error', console.error.bind(console, 'connection error:'));
	 db.once('open', function() {
  		model.find({email: uEmail}, function(err, mUser) {

  			if (err) {

  				res.json({ status: 'Alredy exist' , u: mUser });
  			}
  			else {

  				if (mUser == '') {

  					var newUser = new model({email: uEmail,
  											 username: uUsername,
  											 surname: uSurname});
            newUser.save();

  					res.json({ status: 'Just added' , u: newUser });
  				}
          console.log(mUser)
  			}
  		});
	});
})

module.exports = app;