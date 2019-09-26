import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';

import { ERROR_CODE } from '../../common/consts';
import './login.css';
import Service from '../../common/service';
import Layout from '../../component/layout';
import Button from '../../component/common/button/button';
import Input from '../../component/common/input/input';

class Login extends Component {
  componentDidMount() {
    if (localStorage.getItem('checked')) {
      Service.Login(
        localStorage.getItem('username'),
        localStorage.getItem('password')
      ).then(res => {
        if (res !== null && res !== undefined) {
          let landing = 'work.muxixyz.com/';
          if (landing) {
            window.location.href =
              'http://' +
              landing +
              'landing/?username=' +
              localStorage.getItem('username') +
              '&token=' +
              res.token +
              '&id=' +
              res.user_id;
          }
        } else {
          this.failed = true;
        }
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      username: '',
      password: '',
      infoPassword: ''
    };
  }
  changeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  changePassword(e) {
    let val = e.target.value;
    this.setState({ password: val.substring(0, 15) });
  }

  changeCheck(e) {
    const { isChecked } = this.state;
    this.setState({
      isChecked: !isChecked
    });
  }

  alert(string) {
    Notification.newInstance({}, notification => {
      notification.notice({
        content: string
      });
    });
  }
  login() {
    const { username, password, isChecked } = this.state;
    if (username && password) {
      Service.Login(username, password).then(res => {
        if (res.code === ERROR_CODE.USER_NOT_FOUND) {
          this.alert('用户不存在');
        } else if (res.code === ERROR_CODE.PWD_NOT_CORRECT) {
          this.alert('密码错误');
        } else if (res.code === 0) {
          this.alert('登录成功');
          // 如果登陆成功，缓存登陆信息
          if (isChecked) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('checked', isChecked);
          }
          // landing 逻辑是获取地址栏中的 landing 参数，然后在这个时候跳转。
          // landing 参数是应用登陆跳转到内网门户时加在 URL 里面的，比如：http://pass.muxixyz.com/?landing=work.muxixyz.com%2Flanding
          // 为了防止内网门户这边路由跳转时 landing 参数丢失，服务端会把 landing 放在cookie里面
          // 所以这个从 cookie 里获取 landing 然后跳转就可以

          // let landing = "work.muxixyz.com/";
          // window.location.href =
          //   "http://" +
          //   landing +
          //   "landing/?username=" +
          //   username +
          //   "&token=" +
          //   res.data.token +
          //   "&id=" +
          //   res.data.user_id;
        } else {
          this.alert('未知错误，请联系应用管理员');
        }
      });
    } else {
      this.alert('用户名或密码不能为空');
    }
  }
  render() {
    const { isChecked, username, password } = this.state;
    return (
      <div>
        <Layout>
          <div className="sign-in-container">
            <div className="title">
              <div className="span1">登录</div>
              <div className="span2">
                <Link
                  to="/register"
                  style={{
                    textDecoration: 'none',
                    color: 'rgba(145,145,145,1)'
                  }}
                >
                  注册
                </Link>
              </div>
            </div>

            <div className="input-prepend">
              <Input
                type="text"
                placeholder="用户名或邮箱"
                value={username}
                onChange={this.changeUsername.bind(this)}
              />
            </div>
            <div className="input-prepend">
              <Input
                type="password"
                placeholder="密码"
                value={password}
                onChange={this.changePassword.bind(this)}
              />
            </div>
            <div className="auto-login-btn">
              <Input
                type="checkbox"
                value="true"
                checked={isChecked}
                onChange={this.changeCheck.bind(this)}
                name="session[auto-login]"
                className="session-auto-login"
              />
              <div className="focus" onClick={this.changeCheck.bind(this)}>
                下次自动登陆
              </div>
              <div className="find-pass">
                <Link to="/find_pass" style={{ textDecoration: 'none' }}>
                  找回密码？
                </Link>
              </div>
            </div>
            <Button
              disabled={false}
              type="button"
              btnContent="登录"
              onClick={this.login.bind(this)}
            />
          </div>
        </Layout>
      </div>
    );
  }
}
export default Login;
