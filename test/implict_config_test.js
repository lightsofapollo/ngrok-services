suite('implict configuration', function() {
  var run = require('./run');
  var expected = require('./ngrok_services');

  teardown(function() {
    return run(['stop']);
  });

  test('with only cwd', function() {
    return run(['start']).then(
      function(result) {
        var hosts = JSON.parse(result.stdout);
        assert.deepEqual(
          Object.keys(hosts).sort(),
          Object.keys(expected).sort()
        );
      }
    );
  });

  test('with only directory', function() {
    return run(['start', '.']).then(
      function(result) {
        var hosts = Object.keys(JSON.parse(result.stdout)).sort();
        var expectedHosts = Object.keys(expected).sort();
        assert.deepEqual(hosts, expectedHosts);
      }
    );
  });
});
