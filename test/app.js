var request = require('supertest'),
	app = require('../lib/app.js');
	
describe('Response json', function () {
	
	
	//Если это аякс, должны получать json
	it('should be responded as json', function (done) {
		request(app)
			.post('/register/')
			.type('form')
  			.send('email=bob@gmail.com')
			.expect('Content-Type', /application\/json/)
			.expect(200, done);
	});
});

describe('GET /', function () {

	//Должен быть title === Мой сайт
	it('should be included title', function (done) {
		request(app)
			.get('/')
			.end(function (err, res) {
				if (err) return done(err);
				res.text.should.include('<title>Мой сайт</title>');
				done();
			});
	});
	
	//Должен быть title === Мой сайт
	it('should be included title', function (done) {
		request(app)
			.get('/')
			.set('X-Requested-With', 'XMLHttpRequest')
			.end(function (err, res) {
				if (err) return done(err);
				res.body.should.have.property('data');
				res.body.data.should.have.property('title', 'Мой сайт');
				done();
			});
	});
});