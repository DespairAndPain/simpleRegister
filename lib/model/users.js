
var mongoose = require('mongoose');

// Схема
var usersSchema = mongoose.Schema({
  		    email: String,
  		    username: String,
  		    lastName: String
  		});

module.exports =  mongoose.model('Users', usersSchema);