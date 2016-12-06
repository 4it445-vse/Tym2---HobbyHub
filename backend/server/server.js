'use strict';

const log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    {
      type: 'file',
      filename: `log/app.log`,
    },
  ],
  replaceConsole: true,
});

var dotenv = require('dotenv');
dotenv.config();

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
var multer = require('multer');
app.use(multer().none());

app.get('/hello', function (req, res) {
  const data = {
    hello: 'world',
    time: new Date(),
  };
  res.header({ 'Content-Type': 'application/json' });
  res.send(JSON.stringify(data));
});


var LoopBackContext = require('loopback-context');

app.use(LoopBackContext.perRequest());
app.use(loopback.token());
app.use(function setCurrentUser(req, res, next) {
  if (!req.accessToken) {
    return next();
  }
  console.log('app.models.customers.findById: ', req.accessToken.userId );
    var loopbackContext = LoopBackContext.getCurrentContext();
	loopbackContext.set('currentUserId', req.accessToken.userId);
	  next();
  /*app.models.customers.findById(req.accessToken.userId, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('No user with this access token was found.'));
    }
    var loopbackContext = LoopBackContext.getCurrentContext();
    if (loopbackContext) {
      loopbackContext.set('currentUser', user);
    }
    next();
  });*/
});


var express=require('express');

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "team02.hobbyhub@gmail.com",
        pass: "v0YUkI3MNl"
    }
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module || GLOBAL.PhusionPassenger)
    app.start();
});
