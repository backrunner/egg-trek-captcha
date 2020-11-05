'use strict';

const Captcha = require('./lib/captcha');

module.exports = app => {
  app.captcha = new Captcha(app, app.config.trekCaptcha);
};
