suite('error reporting', function() {
  var run = require('./run');
  var URL = require('url');

  teardown(function() {
    return run(['stop', 'pid1']);
  });

  test('errors', function(done) {
    return run(['start', 'pid1', '--format', 'env']).then(
      function (result) {
        var stdout = result.stdout;
        var split = stdout.split('=');
        var name = split.shift();
        var value = URL.parse(split.shift().replace(/\'/g, ''));

        assert.equal(value.protocol, 'https:');
        assert.equal(name, 'HTTP');
      }
    );
  });
});

