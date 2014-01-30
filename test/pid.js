function pid(folder) {
  return __dirname + '/' + folder + '/.ngrok_services.pid';
}

module.exports = pid;
