'use strict';

const captcha = require('trek-captcha');
const { v4: uuidv4 } = require('uuid');

class Captcha {
  constructor(app, config) {
    this.app = app;
    this.config = config;
  }
  async gen() {
    const { token, buffer } = await captcha();
    const uuid = uuidv4();
    if (this.config.redis) {
      // validation code expires in 30 mins
      await this.app.redis.set(`verify-code-${uuid}`, token, 'ex', 1800);
    }
    return {
      uuid,
      token,
      captcha: buffer.toString('base64'),
    };
  }
  async verify(uuid, code) {
    if (!this.config.redis) {
      return {
        success: false,
        reason: 'Cannot verify the code while redis is not enabled.',
      };
    }
    const existed = await this.app.redis.get(`verify-code-${uuid}`);
    if (!existed) {
      return {
        success: false,
        reason: 'Code is not existed.',
      };
    }
    if (existed !== code) {
      return {
        success: false,
        reason: 'Code is not right.',
      };
    }
    return {
      success: true,
    };
  }
}

module.exports = Captcha;
