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

});

describe('API Tests', function () {
   it('Should return 400 Bad Request if valid params or required were not passed', function () {
      request(serverURL)
         .get('/calculate/{"notValid" : 1}')
         .expect(400)
         .then(response => {
            expect(response.body).to.be.empty;
      });
   });

   it('Should return 200 OK and json response if at least required params were passed', function () {
      request(serverURL)
         .get('/calculate/{"notValid" : 1, "weight": 1337}')
         .expect(200)
         .then(response => {
            expect(response.body)
            .to.be.eql({weight : 1337});
         });
   });

})
