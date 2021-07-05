import 'whatwg-fetch';
import Notification from 'rc-notification';
import getCookie from './cookie';
import getFromUrl from './getFromUrl';

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
  // get auth-token
  getOauthToken(aceessCode) {
    let client_id = getFromUrl('client_id');
    let client_secret = getFromUrl('client_secret');
    let formdata = new FormData();
    formdata.append('client_secret', client_secret);
    formdata.append('code', aceessCode);
    //因为要用formdata数据格式，所以暂时去掉headers，不然浏览器会自动将formdata格式转换为WebKitFormBoundary模式
    return Fetch(
      `/auth/api/oauth/token?response_type=token&grant_type=authorization_code&client_id=${client_id}`,
      {
        method: 'POST',
        formdata: formdata
      }
    );
  },
  //refresh-token
  refreshtoken(token) {
    let client_id = getFromUrl('client_id');
    let client_secret = getFromUrl('client_secret');
    let formdata = new FormData();
    formdata.append('client_secret', client_secret);
    formdata.append('refresh_token', token);
    return Fetch(
      `/auth/api/oauth/token/refresh?grant_type=refresh_token&client_id=${client_id}`,
      {
        method: 'POST',
        formdata: formdata
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
