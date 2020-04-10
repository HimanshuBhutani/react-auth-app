'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const loopbackConsole = require('loopback-console');
const bodyParser = require('body-parser');


const app = module.exports = loopback();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // adding loopback console => node . --console
  if (loopbackConsole.activated()) {
    loopbackConsole.start(app, {
      prompt: 'React-auth-app',
    });
  } else if (require.main === module) {
    app.start();
  }
});
