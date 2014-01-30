suite('pid placement', function() {
  var run = require('./run');
  var pid = require('./pid');
  var fs = require('fs');

  teardown(function() {
    return run(['stop']);
  });

  test('pid is created in the folder with the config', function() {
    return run(['start', 'pid1']).then(
      function() {
        assert.ok(fs.existsSync(pid('pid1')), 'creates pid');
      }
    ).then(
      function() {
        return run(['stop', 'pid1']);
      }
    ).then(
      function() {
        assert.ok(!fs.existsSync(pid('pid1')), 'removes pid');
      }
    );
  });
});
