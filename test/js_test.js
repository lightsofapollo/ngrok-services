suite('js config file', function() {
  var run = require('./run');
  var pid = require('./pid');
  var fs = require('fs');

  teardown(function() {
    return run(['stop', 'js']);
  });

  test('load config files ending with .js', function() {
    return run(['start', 'js']).then(
      function(result) {
        var json = JSON.parse(result.stdout);
        assert.ok(json.js, 'can find js files by default');
      }
    ).then(
      function() {
        return run(['stop', 'js']);
      }
    );
  });
});

