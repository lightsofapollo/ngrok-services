var fsPath = require('path');
var fs = require('fs');
var ngrok = require('ngrok');
var ngrokConfig = require('../ngrok_config');


function commandStart(configPath, options) {
  // module resolution so a .js OR a .json file can be specified.
  var modulePath = fsPath.resolve(configPath);
  var config = require(modulePath);

  ngrokConfig(config).then(
    function(services) {
      // write the PID file
      fs.writeFileSync(options.pidFile, process.pid);

      // now that we have the services send the message over so
      // the parent can detach and let this process keep running.
      process.send([null, services]);
    },
    function(err) {
      process.send([{
        message: err.message,
        stack: err.stack
      }]);
    }
  );

  // ngrok keep track of the children so we can send kill when we get SIGTERM
  process.once('SIGTERM', function() {
    // remove the PID file so other can use the space
    fs.unlinkSync(options.pidFile);

    // initiate the disconnect
    ngrok.disconnect(function() {
      // then exit
      process.exit();
    });
  });
}


// wait for the parent to send us a message
process.once('message', function(args) {
  // then run with the parent commands
  commandStart.apply(this, args);
});
