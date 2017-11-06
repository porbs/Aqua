var chai = require('chai');
var expect = chai.expect;
var processor = require('./../api/controllers/processor');
var request = require('supertest');

var serverURL = 'localhost:3000';
var DEFAULT_TIMEOUT = 10000;

describe('Processor Tests', function() {
  it('Should return an empty object if valid params were not found',
   function() {
      expect(processor.checkParams({notValid1 : 1, notValid2 : 2}))
         .to.be.empty;
   });

   it('Should return an object only with valid properties ', function(){
      expect(processor.checkParams(
         {notValid1 : 1,
          notValid2 : 2,
           weight: 1337}))
         .to.have.a.property('weight', 1337);
   });

   it('Should return true if at least required params were passed ', function () {
     expect(processor.checkForRequired({notRequired : 1, weight : 2}))
      .to.be.equal(true);
   });

   it('Should return NaN if params\' value validation was failed', function () {
     expect(processor.calculateWaterAmount({weight : 123, sportActivity : "notValid"}))
     .to.be.eql('NaN');
   });

   it('Should return number if all passed valid params', function () {
     expect(processor.calculateWaterAmount({weight : 100, sportActivity : 1}))
     .to.be.equal('3.4');
   });

});

describe('Params Validation Tests', function() {
  it('Should return NaN if not a number', function () {
    expect(processor.uIntegerValidation('hello'))
    .to.be.NaN;
  });
  it('Should return number if Unsigned Integer passed', function () {
    expect(processor.uIntegerValidation(123))
    .to.be.equal(123);
  });
  it('Should return NaN if passed value < 0', function () {
    expect(processor.uIntegerValidation(-123))
    .to.be.NaN;
  });
});

describe('API Tests: processInfo', function () {
   it('Should return 400 Bad Request if required were not passed', function (done) {
     this.timeout(DEFAULT_TIMEOUT);
      request(serverURL)
         .post('/calculate')
         .type('json')
         .send({notValid : 0})
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         .end(function (err, res) {
           expect(res.status).to.be.equal(400);
           done();
         });
   });

   it('Should return 200 OK status if at least required params were passed', function (done) {
     this.timeout(DEFAULT_TIMEOUT);
      request(serverURL)
         .post('/calculate')
         .type('json')
         .send({weight : 1337})
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         .end(function(err, res) {
           expect(res.status).to.be.equal(200);
           done();
         });
   });
});

describe('API Tests: getSchema',function () {
  this.timeout(DEFAULT_TIMEOUT);
  it('Should return 200 OK', function(done){
    request(serverURL)
       .get('/schema')
       .end(function(err, res) {
         expect(res.status).to.be.equal(200);
         done();
       });
  });

  it('Should return json array', function(done){
    this.timeout(DEFAULT_TIMEOUT);
    request(serverURL)
       .get('/schema')
       .end(function(err, res) {
         expect(res.body)
         .to.be.an('array');
         done();
       });
  });

  it('Should return json array with objects having name, requierd and description properties ', function(done){
    this.timeout(DEFAULT_TIMEOUT);
    request(serverURL)
       .get('/schema')
       .end(function(err, res) {
         expect(res.body[0])
         .to.have.all.keys('name', 'required', 'description');
         done();
       });
  });

  it('Should return json with result field', function(done) {
    this.timeout(DEFAULT_TIMEOUT);
    request(serverURL)
       .post('/calculate')
       .type('json')
       .send({weight : 100})
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .end(function(err, res) {
         expect(res.body).to.have.a.property('result');
         done();
       });
  })

});
