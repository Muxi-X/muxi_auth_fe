import 'whatwg-fetch';
import Notification from 'rc-notification';

function Fetch(url, opt = {}) {
  opt.method = opt.method || 'GET';
  opt.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  if (opt.token) {
    opt.headers.token = opt.token;
  }

  opt.body = JSON.stringify(opt.data) || null;

  return fetch(url, opt)
    .then(response => {
      if (response.ok) {
        return response.json().then(res => {
          return res;
        });
      } else {
        return response.json().then(res => {
          return new Promise((_, reject) => {
            console.log(res);
            reject(res);
          });
        });
      }
    })
    .catch(e => {
      Notification.newInstance({}, notification => {
        notification.notice({
          content: `服务端错误：${e.message}`
        });
      });
      // 切换下一个 then 调用
      throw e;
    });
}

let Service = {
  // login
  Login(username, password) {
    return Fetch('/auth/api/signin', {
      method: 'POST',
      data: {
        username: username,
        password: btoa(password)
        // password: password
      }
    });
  },
  // register
  register(email, username, password) {
    return Fetch('/auth/api/signup', {
      method: 'POST',
      data: {
        email: email,
        username: username,
        password: btoa(password)
      }
    });
  },
  // check email
  checkEmail(email) {
    return Fetch(`/auth/api/check_email?email=${email}`);
  },
  // check username
  checkUsername(username) {
    return Fetch(`/auth/api/check_name?username=${username}`);
  },
  // reset password
  resetPassword(email, password, captcha) {
    return Fetch('/auth/api/password/reset', {
      method: 'POST',
      data: {
        new_password: btoa(password),
        email: email,
        captcha: captcha
      }
    });
  },
  // get captcha
  getCaptcha(email) {
    return Fetch('/auth/api/password/get_captcha', {
      method: 'POST',
      data: {
        email: email
      }
    });
  },
  // check captcha
  checkCaptcha(email, captcha) {
    return Fetch('/auth/api/password/check_captcha', {
      method: 'POST',
      data: {
        email: email,
        captcha: captcha
      }
    });
  }
};

export default Service;
