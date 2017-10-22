'use strict';
module.exports = function(app) {
  var aqua = require('../controllers/aquaController');

  app.route('/calculate/:info')
    .get(aqua.processInfo);
};
