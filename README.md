# egg-trek-captcha

A captcha plugin based on trek-captcha.

## Install

```bash
npm i egg-trek-captcha --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.trekCaptcha = {
  enable: true,
  package: 'egg-trek-captcha',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.trekCaptcha = {
  // trek-captcha options
  size: 4,
  style: -1
  // redis related function (need egg-redis)
  redis: false,
  // captcha expires
  expires: 3000,
};
```

If you enable the redis related function, you can use "app.catpcha.verfiy" to verify your code.

Request should have an UUID and verify your code like this:

```js
const res = await app.captcha.verify(uuid, code);
console.log(res);
/**
 * res: {
 *   success: true, // or false
 *   reason: '', // if failed, here's the reason
 * }
*/
```

## License

[MIT](LICENSE)
