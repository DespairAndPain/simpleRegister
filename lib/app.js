var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var mongoose = require('mongoose');	
var app = express();


var urlencodedParser = bodyParser.urlencoded({ extended: false })
mongoose.connect('mongodb://localhost/ridero');
var model = require('./model/users');

app.post('/register/', urlencodedParser, function (req, res) {

	if (!req.body) {
    return res.sendStatus(400)
  }
  else {
  	var rightEmail = false;
  	var uEmail = req.body.email+'';
  	var uUsername = req.body.username;
  	var ulastName = req.body.lastName;

  	if (validator.isEmail(uEmail)) {
  		rightEmail = true;
  	}
  	var db = mongoose.createConnection('mongodb://localhost/ridero');
  	//db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      model.find({email: uEmail}, function(err, mUser) {

       if (err) {

        res.json({ status: 'Alredy exist' , u: mUser });
        console.log(1);
      }
      else {

        if (mUser == '') {

         var newUser = new model({email: uEmail,
          username: uUsername,
          lastName: ulastName});
         newUser.save();

         res.json({ status: 'Just added' , u: newUser });
         console.log(2);
       }
       else {
        console.log(mUser)
        res.json({ status: 'Alredy exist' , u: mUser });
      }
    }
  });
    });
  }
})

module.exports = app;