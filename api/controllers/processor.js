function processor() {}

processor.stats = [
   {name : 'weight', required : true, description: 'Unsigned Float'},
   {name : 'age', required : false, description: 'Unsinged Integer'},
   {name : 'climateZone', required : false, description : 'Integer between [0 .. 2]'},
   {name : 'sportCondition', required : false, description : 'Integer between [0 .. 2]'}];

processor.uFloatValidation = function(value) {
  if(typeof value === 'number' && Number.isFinite(value)){
    if(value >= 0){
      value.toPrecision(5);
      return value;
    }
  }
  return NaN;
}

processor.uIntegerValidation = function(value) {
  if(typeof value === 'number' && Number.isFinite(value)){
    if(value >= 0){
      return value;
    }
  }
  return NaN;
}

processor.checkParams = function(params) {
   var validParams = {};
   for (stat in processor.stats){
      if (params.hasOwnProperty(processor.stats[stat].name)){
         validParams[processor.stats[stat].name] = params[processor.stats[stat].name];
      }
   }
   return validParams;
};

processor.checkForRequired = function (params) {
  for (stat in processor.stats){
    if (processor.stats[stat].required){
      if(params[processor.stats[stat].name] == null){
        return false;
      }
    }
  }
  return true;
}

processor.validateParams = function (params) {
  return params;
}

module.exports = processor;
