var chai = require('chai');
var should = require('should');
var chaiHttp = require('chai-http');
var server = require('../lib/app');
var mongoose = require('mongoose');
require('should-http');


chai.use(chaiHttp);

describe('Should add object and response "Just added" or check and if exist response with "Alredy exist"', function() {
	

	after(function() {
			//  Удаление записи после всех действий
			var model = require('../lib/model/users');
			model.remove({ "email": 'stevejamson@gmail.com' }, function (err) {
				if (err) return console.log(err);
				else console.log('Removed');
			});
		});

	it('should add a user on /register/ POST', function(done) {

		chai.request(server)
		.post('/register/')
		.type('form')	
		.send({'username': 'Stive', 'lastName': 'Jamson', 'email': 'stevejamson@gmail.com'})
		.end(function(err, res){

			res.should.have.status(200);
			res.should.be.json;

			res.body.should.have.property('u');
			res.body.should.have.property('status');
			res.body.status.should.equal('Just added');
			// тут возвращает только объект
			res.body.u.should.have.property('username');
			res.body.u.should.have.property('lastName');
			res.body.u.should.have.property('email');
			res.body.u.should.have.property('_id');
			res.body.u.username.should.equal('Stive');
			res.body.u.lastName.should.equal('Jamson');

			done();
		});
	});

	it('should check existing user', function(done) {

		

		chai.request(server)
		.post('/register/')
		.type('form')
		.send({'username': 'Stive', 'lastName': 'Jamson', 'email': 'stevejamson@gmail.com'})
		.end(function(err, res){

			res.should.have.status(200);
			res.should.be.json;

			res.body.should.have.property('u');
			res.body.should.have.property('status');
			res.body.status.should.equal('Alredy exist');
			// [0] - т.к. возвращает массив объектов
			res.body.u[0].should.have.property('username');
			res.body.u[0].should.have.property('lastName');
			res.body.u[0].should.have.property('email');
			res.body.u[0].should.have.property('_id');
			res.body.u[0].username.should.equal('Stive');
			res.body.u[0].lastName.should.equal('Jamson');

			done();
		});


	});
});

describe('Should check empty input', function() {
	it('empty username', function(done) {
		chai.request(server)
		.post('/register/')
		.type('form')
		.send({'username': '', 'lastName': 'Jamson', 'email': 'stevejamson@gmail.com'})
		.end(function(err, res){

			res.should.have.status(200);
			res.should.be.json;

			res.body.should.have.property('status');
			res.body.status.should.equal('Uncorrect input');
			done();
		});
	});

	it('empty lastName', function(done) {
		chai.request(server)
		.post('/register/')
		.type('form')
		.send({'username': 'Stive', 'lastName': '', 'email': 'stevejamson@gmail.com'})
		.end(function(err, res){

			res.should.have.status(200);
			res.should.be.json;

			res.body.should.have.property('status');
			res.body.status.should.equal('Uncorrect input');
			done();
		});
	});

	it('empty email', function(done) {
		chai.request(server)
		.post('/register/')
		.type('form')
		.send({'username': '', 'lastName': 'Jamson', 'email': ''})
		.end(function(err, res){

			res.should.have.status(200);
			res.should.be.json;

			res.body.should.have.property('status');
			res.body.status.should.equal('Uncorrect input');
			done();
		});
	});

	it('uncorrect email', function(done) {
		chai.request(server)
		.post('/register/')
		.type('form')
		.send({'username': '', 'lastName': 'Jamson', 'email': 'stevejamson.com'})
		.end(function(err, res){

			res.should.have.status(200);
			res.should.be.json;

			res.body.should.have.property('status');
			res.body.status.should.equal('Uncorrect input');
			done();
		});
	});
});