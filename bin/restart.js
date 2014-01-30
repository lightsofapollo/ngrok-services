// run ourselves via spawn (don't do this)
function runSelf(command, argv, callback) {
  var proc = spawn(__dirname, [command].concat(argv));

  proc.once('exit', function(code) {
    if (code !== 0) return process.exit(code);
    callback();
  });
}

// restart
program.
  command('restart [config]').
  description('ensure the service is running by stopping/starting').
  action(function(config, cmd) {
    // super ghetto start/restart
    var exec = require('exec');
    var options = [];
    if (cmd.pidFile) options.push('--pid-file ' + cmd.pidFile);
    options.push(config);

    runSelf('stop', options, function() {
      runSelf('start', options);
    });
  });


