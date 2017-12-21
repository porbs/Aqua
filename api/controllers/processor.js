function processor() {}

processor.stats = [
   {name : 'weight', required : true, description: 'Weight in KGs : Unsigned Integer'},
   {name : 'gender', required: false, description: 'Male : 1, Female: 0'},
   {name : 'sportActivity', required : false, description : 'Hours per day : Unsinged Integer, less than 24'}];

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

processor.calculateWaterAmount = function (params) {
  var genderCoef = 33;
  var sportCoef = 0;

  if(processor.uIntegerValidation(params.weight) == NaN){
    return NaN;
  }

  if (params.gender == 1){
    //in case of male gender
    genderCoef += 2;
  }
  else if (params.gender == 0){
    //in case of female gender
    genderCoef -= 2;
  }

  if (params.sportActivity !== undefined) {
    if(processor.uIntegerValidation(params.sportActivity) != NaN){
      // 0.33 liter per 1 hour of sport activity
      sportCoef += 0.33 * (params.sportActivity % 25);
    }
  }

  var result = (params.weight / genderCoef) + sportCoef;
  return result.toFixed(1);
}

module.exports = processor;
