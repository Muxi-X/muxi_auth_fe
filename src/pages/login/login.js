import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import Background from '../../images/login.png';
import Service from '../../common/service';
import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';

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
    var val = e.target.value;
    this.setState({ password: val.substring(0, 15) });
    // if(length > 15){
    //     this.setState({"infoPassword":"不能输入超过15个字!"});
    // }else{
    //     this.setState({"infoPassword":""});
    // }
    // if(length < 8){
    //     this.setState({"infoPassword":"不能输入低于8个字!"});
    // }else{
    //     this.setState({"infoPassword":""});
    // }
    // if(length > 8 && length < 15){
    //     this.setState({
    //         isRightPassword:true
    //     })
    // }
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
      if (isChecked) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('checked', isChecked);
      }
      Service.Login(username, password)
        .then(res => {
          if (res.data.message === 'The user was not found.') {
            this.alert('用户名错误,无效的用户名');
          } else if (res.data.message === 'Password incorrect.') {
            this.alert('密码错误');
          } else if (res.message === 'OK') {
            this.alert('登录成功');
            let landing = 'work.muxixyz.com/';
            window.location.href =
              'http://' +
              landing +
              'landing/?username=' +
              username +
              '&token=' +
              res.data.token +
              '&id=' +
              res.data.user_id;
          } else {
            this.alert('登录失败，请检查后重试');
          }
        })
        .catch(() => {
          this.alert('登录失败（请检查用户名和密码）');
        });
    } else {
      this.alert('用户名或密码不能为空');
    }
  }
  render() {
    const { isChecked, username, password } = this.state;
    return (
      <div
        className="sign "
        style={{ backgroundImage: `url(${Background})` }}
        className="background"
      >
        <div className="main">
          <div className="logo">
            <img src={require('../../images/muxi_logo.png')} alt=" " />
          </div>

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
              <input
                type="text"
                placeholder="用户名"
                value={username}
                onChange={this.changeUsername.bind(this)}
                className="session_nickname"
              />
            </div>
            <div className="input-prepend">
              <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={this.changePassword.bind(this)}
                className="user-password"
              />
            </div>
            <div className="auto-login-btn">
              <input
                type="checkbox"
                value="true"
                checked={isChecked}
                onChange={this.changeCheck.bind(this)}
                name="session[auto-login]"
                className="session-auto-login"
              />
              <div className="focus" onClick={this.changeCheck.bind(this)}>
                {' '}
                下次自动登陆{' '}
              </div>
              <div className="find-pass">
                <Link to="/find_pass" style={{ textDecoration: 'none' }}>
                  找回密码？{' '}
                </Link>
              </div>
            </div>
            <button
              className="sign-in-button focus"
              type="button"
              onClick={this.login.bind(this)}
            >
              {' '}
              登录{' '}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
