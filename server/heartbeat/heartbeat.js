'use strict';

var Log = require('../log.js');

function HeartbeatController(query) {
  var _this = this;
  this.log = new Log();
  this.getStatus = function (request, response) {
    query.get(function (err, result) {
      _this.handleResponse(err, result, response);
    });
  };

  this.handleResponse = function (err, result, response) {
    if (err) {
      _this.log.logError(JSON.stringify({ 'Connection Error:': err }), 500);
      response.status(500).json({ 'Connection Error:': err });
    } else {
      if (result.rows.length > 0) {
        _this.log.logResponse(JSON.stringify(result.rows), 200);
        response.status(200).json(result.rows);
      } else {
        _this.log.logWarning('No available content', 500);
        response.status(500).json(result.rows);
      }
    }
  };
}

module.exports = HeartbeatController;
