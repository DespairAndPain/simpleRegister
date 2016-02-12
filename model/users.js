
var mongoose = require('mongoose');

// Схема
var usersSchema = mongoose.Schema({
  		    email: String,
  		    username: String,
  		    surname: String
  		});

module.exports =  mongoose.model('Users', usersSchema);