var Promise = require('promise');
var execFile = require('child_process').execFile;

/**
Promise wrapper for executing ngrok services
*/
function run(argv) {
  return new Promise(function(accept, reject) {
    var result = {};
    var bin = __dirname + '/../bin/ngrok-services';

    // cwd of the test folder so the pid file is in the right place
    var options = { cwd: __dirname };

    var proc = execFile(bin, argv, options, function(err, stdout, stderr) {
      if (err) return reject(err);
      result.err = err;
      result.stdout = stdout;
      result.stderr = stderr;
      accept(result);
    });
  });
}

module.exports = run;
