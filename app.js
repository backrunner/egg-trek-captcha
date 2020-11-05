'use strict';

const Captcha = require('./lib/captcha');

module.exports = app => {
  console.log(app.config.trekCaptcha);
  app.captcha = new Captcha(app, app.config.trekCaptcha);
};
