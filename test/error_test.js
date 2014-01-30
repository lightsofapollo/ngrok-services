suite('error reporting', function() {
  var run = require('./run');

  test('errors', function(done) {
    return run(['start', 'invalid']).then(
      done.bind(null, new Error('should not be a success')),
      function(err) {
        assert.ok(err, 'has error');
        assert.ok(err.message.indexOf('authtoken') !== -1);
      }
    );
  });
});
