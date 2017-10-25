'use strict';

var processor = require('./processor');

exports.processInfo = function(req, res) {
  var params = req.body;
  var validParams = processor.checkParams(params);

  if(!processor.checkForRequired(validParams)){
    res.status(400).json({Error : "No required params were found"});
  }else {
    res.status(200).json(validParams);
  }
};

exports.getSchema = function (req, res) {
  res.status(200).json(processor.stats);
}
