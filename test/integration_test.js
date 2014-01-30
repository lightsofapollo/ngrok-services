suite('ngrok-services', function() {
  var Promise = require('promise');

  var assert = require('assert');
  var exec = require('child_process').exec;
  var execFile = require('child_process').execFile;
  var http = require('http');
  var https = require('https');
  var fs = require('fs');

  var fixture = __dirname + '/config.json';

  function cleanupPid() {
    var path = __dirname + '/.ngrok_services.pid';
    if (fs.existsSync(path)) fs.unlinkSync(path);
  }

  teardown(cleanupPid);
  setup(cleanupPid);

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

  teardown(function() {
    return run(['stop']);
  });

  test('start config file', function(done) {
    // start the http server
    var server = http.createServer(function(req, res) {
      // woot proxy works!!
      server.close();
      done();
    });

    // magic number for the port (see config.json)
    server.listen(60323);
    run(['start', fixture]).then(
      function(result) {
        // stdout should be valid json always.
        var hosts = JSON.parse(result.stdout);
        https.get(hosts.http);
      },
      function errs(result) {
        done(result.err);
      }
    );
  });
});
