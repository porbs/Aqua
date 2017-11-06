'use strict';

var processor = require('./processor');

exports.processInfo = function(req, res) {
  var params = req.body;
  var validParams = processor.checkParams(params);

  if(!processor.checkForRequired(validParams)){
    res.status(400).json({Error : "No required params were found"});
  }else {
    var calcResult = processor.calculateWaterAmount(validParams);
    if(calcResult != NaN){
      res.status(200).json({result : calcResult});
    }
    else {
      res.status(400).json({Error : "Invalid params value were passed"});
    }
  }
};

exports.getSchema = function (req, res) {
  res.status(200).json(processor.stats);
}
