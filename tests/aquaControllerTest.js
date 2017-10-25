var chai = require('chai');
var expect = chai.expect;
var processor = require('./../api/controllers/processor');
var request = require('supertest');

var serverURL = 'localhost:3000';

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

});

describe('Params Validation Tests', function() {
  it('Should return NaN if not a number', function () {
    expect(processor.uFloatValidation('hello'))
    .to.be.NaN;
  });
  it('Should return NaN if not a number', function () {
    expect(processor.uIntegerValidation('hello'))
    .to.be.NaN;
  });
  it('Should return number if Unsigned Integer passed', function () {
    expect(processor.uIntegerValidation(123))
    .to.be.equal(123);
  });
  it('Should return number if Unsigned Float passed', function () {
    expect(processor.uFloatValidation(123.12345))
    .to.be.equal(123.12345);
  });
  it('Should return NaN if passed value < 0', function () {
    expect(processor.uIntegerValidation(-123))
    .to.be.NaN;
  });
  it('Should return NaN if passed value < 0', function () {
    expect(processor.uFloatValidation(-123.00))
    .to.be.NaN;
  });
});

describe('API Tests', function () {
   it('Should return 400 Bad Request if required were not passed', function (done) {
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

   it('Should return json in response body if at least required params were passed', function (done) {
      request(serverURL)
         .post('/calculate')
         .type('json')
         .send({weight : 1337, notValid : 0})
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         .end(function(err, res) {
           expect(res.body).to.be.eql({weight : 1337});
           done();
         });
   });

   it('Should return 200 OK status if at least required params were passed', function (done) {
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
