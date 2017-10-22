'use strict';

var processor = require('./processor');

exports.processInfo = function(req, res) {
   var params = JSON.parse(req.params.info);
   var validParams = processor.checkParams(params);

   //check for required params
   if(!validParams.hasOwnProperty('weight')){
      res.status(400).send("Error: weight param is missing");
   }else {
      res.status(200).json(validParams);
   }


};
