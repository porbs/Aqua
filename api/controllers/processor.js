function processor() {}

processor.stats = [
   {name : 'weight', required : true},
   {name : 'age', required : false},
   {name : 'climateZone', required : false},
   {name : 'sportCondition', required : false}];

processor.checkParams = function(params) {
   var validParams = {};
   for (stat in processor.stats){
      if (params.hasOwnProperty(processor.stats[stat].name)){
         validParams[processor.stats[stat].name] = params[processor.stats[stat].name];
      }
   }
   return validParams;
};

module.exports = processor;
