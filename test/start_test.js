suite('ngrok-services', function() {
  var http = require('http');
  var https = require('https');
  var fs = require('fs');
  var run = require('./run');

  var fixture = __dirname + '/config.json';
  var fixtureJSON = require(fixture);
  var pidPath = __dirname + '/.ngrok_services.pid';

  function cleanupPid() {
    if (fs.existsSync(pidPath)) fs.unlinkSync(pidPath);
  }

  teardown(cleanupPid);
  setup(cleanupPid);

  teardown(function() {
    // ensure the services stop
    return run(['stop']);
  });

  this.timeout('100s');

  test('start config file', function(done) {
    // start the http server
    var server = http.createServer(function(req, res) {
      // woot proxy works!!
      server.close();
      res.end();

      // turn off the sevices
      run(['stop']).then(function() {
        assert.ok(!fs.existsSync(pidPath), 'pid file is removed');
        done();
      });
    });

    server.listen(fixtureJSON.http.port);

    run(['start', fixture]).then(
      function(result) {
        assert.ok(fs.existsSync(pidPath), 'creates pid file');
        var hosts = JSON.parse(result.stdout);
        var req = http;
        if (hosts.http.indexOf('https') !== -1) {
          req = https;
        }
        // stdout should be valid json always.
        req.get(hosts.http);
      },
      function errs(result) {
        done(result.err);
      }
    );
  });
});
