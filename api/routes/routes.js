'use strict';
module.exports = function(app) {
  var aqua = require('../controllers/aquaController');

  app.route('/calculate')
    .post(aqua.processInfo);

  app.route('/schema')
    .get(aqua.getSchema);
};
