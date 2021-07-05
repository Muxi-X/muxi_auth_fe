import React, { Component } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
// import Background from '../../images/login.png';
import Service from '../../common/service';
import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';
import Layout from '../../component/layout.js';
import Button from '../../component/common/button/button';
import Input from '../../component/common/input/input';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      fristPassword: '',
      secondPassword: '',
      infoUsr: '',
      infoEmail: '',
      infoFristPassword: '',
      infoSecondPassword: '',
      isUserUsed: false,
      isEmailUsed: false,
      isRightPassword: false
    };
  }

  alert(string) {
    Notification.newInstance({}, notification => {
      notification.notice({
        content: string
      });
    });
  }
  usrOnBlur = e => {
    let val = e.target.value;
    const { username } = this.state;
    let result;
    if (!username) {
      this.setState({ infoUsr: '用户名不能为空' });
      return;
    }
    this.setState({ infoUsr: '' });

    Service.checkUsername(val).then(res => {
      result = res.data;
      this.setState({
        isUserUsed: result
      });
      if (result === true) {
        this.setState({ infoUsr: '该用户名已被注册!' });
      } else {
        this.setState({ infoUsr: '' });
      }
    });
  };

  changeUsername(e) {
    let val = e.target.value;
    this.setState({ username: val.substring(0, 20) });
  }

  changeEmail(e) {
    let result = false;
    let isTureEmail = false;
    let val = e.target.value;
    // FIXIT: 不应该限制邮箱的域名
    let myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    this.setState({ email: val.substring(0, 35) });
    if (myReg.test(val)) {
      isTureEmail = true;
    }
    if (isTureEmail === false) {
      this.setState({ infoEmail: '输入的邮箱格式有误' });
      setTimeout(
        function() {
          this.setState({ infoEmail: '' });
        }.bind(this),
        5000
      );
    } else {
      this.setState({ infoEmail: '' });
      Service.checkEmail(val).then(res => {
        result = res.data;
        this.setState({
          isEmailUsed: result
        });
        if (result === true) {
          this.setState({ infoEmail: '该邮箱已被使用!' });
          console.log('该邮箱已被使用');
        }
      });
    }
  }

  changeFristPassword(e) {
    let val = e.target.value;
    let length = val.length;
    this.setState({ fristPassword: val.substring(0, 20) });
    if (length > 15) {
      this.setState({ infoFristPassword: '密码长度不能超过15个字!' });
    } else {
      this.setState({ infoFristPassword: '' });
    }
    if (length < 8) {
      this.setState({ infoFristPassword: '密码长度不能短于8个字!' });
    } else {
      this.setState({ infoFristPassword: '' });
    }
    if (length > 8 && length < 15) {
      this.setState({
        isRightPassword: true
      });
    }
  }

  changeSecondPassword(e) {
    let val = e.target.value;
    const { fristPassword } = this.state;
    this.setState({ secondPassword: val.substring(0, 20) });

    if (val !== fristPassword) {
      this.setState({ infoSecondPassword: '前后两次输入密码不一致!' });
    } else {
      this.setState({ infoSecondPassword: '' });
    }
  }
  register() {
    const {
      isEmailUsed,
      isUserUsed,
      secondPassword,
      fristPassword,
      email,
      username
    } = this.state;

    if (
      !isEmailUsed &&
      !isUserUsed &&
      secondPassword === fristPassword &&
      email !== '' &&
      username !== ''
    ) {
      Service.register(email, username, secondPassword).then(res => {
        if (res.code === 0) {
          this.alert('注册成功');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        }
      });
    } else {
      this.alert('请填写完整/正确的信息');
    }
  }
  render() {
    const {
      username,
      email,
      fristPassword,
      secondPassword,
      infoUsr,
      infoEmail,
      infoFristPassword,
      infoSecondPassword
    } = this.state;
    return (
      <div>
        <Layout>
          <div className="sign-in-container">
            <div className="title">
              <div className="span2">
                <Link
                  to="/login"
                  style={{
                    textDecoration: 'none',
                    color: 'rgba(145,145,145,1)'
                  }}
                >
                  登录
                </Link>
              </div>
              <div className="span1">注册</div>
            </div>
            <form method="post" autoComplete="off">
              <div className="input-prepend">
                <Input
                  type="text"
                  placeholder="用户名"
                  value={username}
                  name="username"
                  onChange={this.changeUsername.bind(this)}
                  onBlur={this.usrOnBlur}
                />
                <label htmlFor="username">{infoUsr}</label>
              </div>
              <div className="input-prepend">
                <Input
                  type="email"
                  placeholder="邮箱"
                  value={email}
                  name="email"
                  onChange={this.changeEmail.bind(this)}
                />
                <label htmlFor="email">{infoEmail}</label>
              </div>
              <div className="input-prepend">
                <Input
                  type="password"
                  placeholder="密码"
                  value={fristPassword}
                  name="fristPassword"
                  onChange={this.changeFristPassword.bind(this)}
                />
                <label htmlFor="fristPassword">{infoFristPassword}</label>
              </div>
              <div className="input-prepend">
                <Input
                  type="password"
                  placeholder="确认密码"
                  value={secondPassword}
                  name="secondPassword"
                  onChange={this.changeSecondPassword.bind(this)}
                />
                <label htmlFor="secondPassword">{infoSecondPassword}</label>
              </div>
              <Button
                type="button"
                onClick={this.register.bind(this)}
                btnContent="开启新世界大门"
              />
              {/* <p className="sign-in-msg">
                以上设置可在页面右上角个人信息中再次修改
              </p> */}
            </form>
          </div>
        </Layout>
      </div>
    );
  }
}
export default Register;
