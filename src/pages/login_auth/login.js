import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';
import getCookie from '../../common/cookie';
import './login.css';
import Service from '../../common/service';
import Layout from '../../component/layout';
import Button from '../../component/common/button/button';
import Input from '../../component/common/input/input';
import getQueryVariable from '../../common/getFromUrl';
class Login_auth extends Component {
  componentDidMount() {
    if (localStorage.getItem('checked')) {
      Service.Login(
        localStorage.getItem('username'),
        localStorage.getItem('password')
      ).then(res => {
        if (res !== null && res !== undefined) {
          this.setState({
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
          });
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
    this.setState({ password: val.substring(0, 20) });
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
  async login() {
    const { username, password, isChecked } = this.state;
    let client_id = getQueryVariable('client_id');
    if (username && password) {
      const res = await Service.getOauthCode(username, password, client_id);
      console.log(res);
      if (res.code === 20102) {
        this.alert('用户不存在');
      } else if (res.code === 20301) {
        this.alert('密码错误');
      } else if (res.code === 0) {
        this.alert('登录成功，正在跳转');
        let accessCode = res.data.code;
        console.log(accessCode);
        //如果用户勾选下次自动登录，保存此次登录信息
        if (isChecked) {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          localStorage.setItem('checked', isChecked);
        }
        //跳转到工作台
        let landing = getCookie('landing');
        window.location.href =
          'http://' + landing + 'landing/?' + 'accessCode=' + accessCode;
      }
    } else {
      this.alert('请输入用户名和密码');
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
export default Login_auth;
