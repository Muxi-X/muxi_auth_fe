function Fetch(url, opt = {}) {
  opt.method = opt.method || "GET";
  opt.headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (opt.token) {
    opt.headers.token = opt.token;
  }

  opt.body = JSON.stringify(opt.data) || null;

  return fetch(url, opt).then(response => {
    return response.json().then(json => {
      switch (response.status) {
        case 200:
          return json;
        case 502:
          util.message(response.statusText, "err");
        case 403:
          util.message(json.message, "err");
        case 401:
          return response.status;
          break;
      }
    });
  });
}

let Service = {
  // login
  Login(username, password) {
    return Fetch("/api/login/", {
      method: 'POST',
      data: {
        username: username,
        password: btoa(password)
      }
    })
  },
  // register 
  register(email, username, password) {
    return Fetch("/api/signup/", {
      method: "POST",
      data: {
        email: email,
        username: username,
        password: password
      }
    })
  },
  // check email
  checkEmail(email) {
    return fetch(`/api/check_email/?email=${email}`)
  },
  // check username
  checkUsername(username) {
    return fetch(`/api/check_name/?username=${username}`)
  },
  // reset password
  resetPassword(email, password, captcha) {
    return Fetch("/api/password/reset", {
      method: "POST",
      data: {
        new_password: password,
        email: email,
        captcha: captcha
      }
    })
  },
  // get captcha
  getCaptcha(email) {
    return Fetch("/api/password/get_captcha/", {
      method: "POST",
      data: {
        email: email
      }
    })
  },
  // check captcha
  checkCaptcha(email, captcha) {
    return Fetch("/api/password/check_captcha/", {
      method: "POST",
      data: {
        email: email,
        captcha: captcha
      }
    })
  },
  // get profile
  getProfile(id, token) {
    return Fetch("/api/show_profile/"+id, {
        token: token
    })
  },
  // get user's share
  getShare(id) {
    return Fetch("http://share.muxixyz.com/api/v2.0/get_one_all/" + id + "/")
  }
};

module.exports = Service;
