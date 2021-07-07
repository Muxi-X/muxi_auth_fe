import 'whatwg-fetch';
import Notification from 'rc-notification';
function Fetch(url, opt = {}) {
  opt.method = opt.method || 'GET';
  opt.headers = {};
  if (opt.token) {
    opt.headers.token = opt.token;
  }

  opt.body = JSON.stringify(opt.data) || null;
  if (opt.formdata) {
    opt.body = opt.formdata;
  }

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
      // 切断下一个 then 调用
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
  },
  // get auth-code
  getOauthCode(username, password) {
    return Fetch(
      '/auth/api/oauth?response_type=code&client_id=51f03389-2a18-4941-ba73-c85d08201d42',
      {
        method: 'POST',
        data: {
          username: username,
          password: btoa(password)
        }
      }
    );
  },
  //get user info
  getUserInfo() {
    return Fetch(`/auth/api//user`, {
      method: 'GET',
      token: localStorage.getItem('token')
    });
  }
};

export default Service;
