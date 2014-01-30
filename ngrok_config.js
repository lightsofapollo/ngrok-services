var ngrok = require('ngrok');
var fsPath = require('path');

var Promise = require('promise');

var ngrokConnect = Promise.denodeify(ngrok.connect);
var ngrokDisconnect = Promise.denodeify(ngrok.disconnect);

// aggregate all the configs into a service -> host map
function launchFromConfig(config) {
  var serviceToHost = {};
  var promises = [];

  Object.keys(config).forEach(function(name) {
    var promise = ngrokConnect(config[name]).then(
      function (host) {
        serviceToHost[name] = host;
      }
    );

    promises.push(promise);
  });

  return Promise.all(promises).then(function() {
    return serviceToHost;
  });
}

module.exports = launchFromConfig;
