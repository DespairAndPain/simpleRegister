var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var mongoose = require('mongoose');	
var app = express();

//querystring library
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// conect к mongodb базе ridero
mongoose.connect('mongodb://localhost/ridero');
// импорт модели пользователей
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

    // Проверка эмайла на правильность
  	if (validator.isEmail(uEmail)) {
  		rightEmail = true;
  	}

  	var db = mongoose.createConnection('mongodb://localhost/ridero');

    db.once('open', function() {
      //поиск пользователся по email'у
      model.find({email: uEmail}, function(err, mUser) {

        if (err) {
         // Если ошибка, то высылаем в объекте
         res.json({ status: 'ошибка' , err: err });
        }
        else if (rightEmail) {
          // Если не найден добавляем запись в базу и возвращаем объектом
          if (mUser == '') {

            var newUser = new model({email: uEmail,
                                      username: uUsername,
                                      lastName: ulastName});
            newUser.save();

            res.json({ status: 'Just added' , u: newUser });
          }
          else {
            // Если не найден добавляем запись в базу и возвращаем объектом
            res.json({ status: 'Alredy exist' , u: mUser });
          }
        }
        else {
          // Если некорректная почта то высылаем ответ то то некорректно
          res.json({ status: 'Uncorrect E-mail' })
        }
      });
    });
  }
})

module.exports = app;