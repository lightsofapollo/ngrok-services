/**
formatter to convert the json to a list of environment variables.
*/

function format(object) {
  return Object.keys(object).map(function(name) {
    return name.toUpperCase() + '=\'' + object[name] + '\'\n';
  }).join('\n');
}

module.exports = format;
