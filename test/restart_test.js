suite('restart', function() {
  var pid = require('./pid');
  var run = require('./run');
  var fs = require('fs');
  var expected = Object.keys(require('./ngrok_services'));

  teardown(function() {
    return run(['stop']);
  });

  test('when it was running', function() {
    var originalKeys;
    return run(['start']).then(
      function(result) {
        originalKeys = Object.keys(JSON.parse(result.stdout)).sort();
        return run(['restart']);
      }
    ).then(
      function(result) {
        assert.deepEqual(
          Object.keys(JSON.parse(result.stdout)).sort(),
          originalKeys
        );
        return run(['stop']);
      }
    );
  });

  test('when it was not running', function() {
    return run(['restart']).then(
      function(result) {
        assert.deepEqual(
          Object.keys(JSON.parse(result.stdout)).sort(),
          expected
        );
        return run(['stop']);
      }
    );
  });
});
