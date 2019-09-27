import React, { Component } from 'react';
import Background from '../../images/login.png';
import './index.css';
import Service from '../../common/service';
import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';
import Layout from '../../component/layout.js';
import Button from '../../component/common/button/button';
import Input from '../../component/common/input/input';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTureEmail: false,
      isTureCaptcha: false,
      btnContent: '发送',
      btnDisable: false,
      time: 60,
      info: '',
      secondInfo: '',
      emailInput: '',
      captchaInput: '',
      infoEmail: '',
      firstPassword: '',
      secondPassword: ''
    };
  }

  changeEmail(e) {
    let isTureEmail = false;
    let val = e.target.value;
    let myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    this.setState({ emailInput: val.substring(0, 20) });
    if (myReg.test(val)) {
      isTureEmail = true;
    }
    if (isTureEmail !== true) {
      this.setState({ infoEmail: '输入的邮箱格式有误' });
      this.setState({ isTureEmail: false });
      setTimeout(
        function() {
          this.setState({ infoEmail: '' });
        }.bind(this),
        1000
      );
    } else {
      this.setState({ infoEmail: '' });
      this.setState({ isTureEmail: true });
    }
  }
  changeCaptcha(e) {
    this.setState({
      captchaInput: e.target.value
    });
  }
  alert(string) {
    Notification.newInstance({}, notification => {
      notification.notice({
        content: string
      });
    });
  }
  submit(e) {
    const {
      firstPassword,
      secondPassword,
      emailInput,
      captchaInput
    } = this.state;
    let result = '';
    if (firstPassword === secondPassword && firstPassword.length > 8) {
      Service.checkCaptcha(emailInput, captchaInput)
        .then(res => {
          result = res.message;
          if (result === 'OK') {
            this.setState({
              isTureCaptcha: true
            });
            Service.resetPassword(emailInput, secondPassword, captchaInput)
              .then(res => {
                this.alert('重置成功');
                window.location.href = '/login';
              })
              .catch(() => {
                this.alert('重置失败，请检查重试');
              });
          } else {
            this.alert('验证码输入错误');
          }
        })
        .catch(() => {
          this.alert('验证码错误');
        });
    } else {
      this.alert('输入的两次密码不一致');
    }
  }
  changeFristPassword(e) {
    let val = e.target.value;
    let length = val.length;
    this.setState({ firstPassword: val.substring(0, 15) });
    if (length > 15) {
      this.setState({ info: '不能输入超过15个字!' });
      setTimeout(
        function() {
          this.setState({ info: '' });
        }.bind(this),
        1000
      );
    } else {
      this.setState({ info: '' });
    }
    if (length < 8) {
      this.setState({ info: '不能输入低于8个字!' });
      setTimeout(
        function() {
          this.setState({ info: '' });
        }.bind(this),
        1000
      );
    } else {
      this.setState({ info: '' });
    }
  }
  changesecondPassword(e) {
    let val = e.target.value;
    const { firstPassword } = this.state;
    this.setState({ secondPassword: val.substring(0, 15) });

    if (val !== firstPassword) {
      this.setState({ secondInfo: '前后两次输入密码不正确!' });
      setTimeout(
        function() {
          this.setState({ secondInfo: '' });
        }.bind(this),
        1000
      );
    } else {
      this.setState({ secondInfo: '' });
    }
  }

  //关键在于用ti取代time进行计算和判断，因为time在render里不断刷新，但在方法中不会进行刷新
  clock = () => {
    let timeChange;
    let ti = this.state.time;
    if (ti > 0) {
      //当ti>0时执行更新方法
      ti = ti - 1;
      this.setState({
        time: ti,
        btnContent: ti + 's后重发'
      });
    } else {
      //当ti=0时执行终止循环方法
      clearInterval(timeChange);
      this.setState({
        btnDisable: false,
        time: 60,
        btnContent: '发送'
      });
    }
  };

  sendCode = () => {
    const { isTureEmail, emailInput } = this.state;
    console.log(document.cookie);
    if (isTureEmail === true) {
      Service.getCaptcha(emailInput)
        .then(res => {
          this.alert('验证码发送成功');
          this.setState({
            btnDisable: true,
            btnContent: '60s后重发'
          });
          //每隔一秒执行一次clock方法
          setInterval(this.clock, 1000);
        })
        .catch(() => {
          this.alert('验证码发送失败');
        });
    } else {
      this.alert('验证码发送失败，请检查重试');
    }
  };

  render() {
    const {
      btnDisable,
      captchaInput,
      emailInput,
      secondPassword,
      firstPassword,
      secondInfo,
      info,
      btnContent,
      infoEmail
    } = this.state;

    return (
      <div>
        <Layout>
          <div className="container">
            <div className="title">找回密码</div>

            <div className="input-prepend1">
              <Input
                type="text"
                placeholder="输入邮箱"
                name="email"
                value={emailInput}
                onChange={this.changeEmail.bind(this)}
                className="email-blank"
              />
              <Button
                type="primary"
                className={
                  btnDisable ? 'get-captcha-unuse focus ' : 'get-captcha focus '
                }
                onClick={this.sendCode}
                disabled={btnDisable}
                btnContent={btnContent}
              />
              <label className="emailtab" for="email">
                {infoEmail}
              </label>
            </div>
            <div className="margin-fix">
              <Input
                type="text"
                placeholder="验证码"
                value={captchaInput}
                onChange={this.changeCaptcha.bind(this)}
              />
            </div>
            <div className="input-prepend">
              <Input
                type="password"
                placeholder="请输入新密码"
                value={firstPassword}
                name="firstPassword"
                onChange={this.changeFristPassword.bind(this)}
              />
              <label for="firstPassword">{info}</label>
            </div>
            <div className="input-prepend">
              <Input
                type="password"
                placeholder="请再次输入新密码"
                value={secondPassword}
                name="secondPassword"
                onChange={this.changesecondPassword.bind(this)}
              />
              <label for="secondPassword">{secondInfo}</label>
            </div>
            <Button
              type="button"
              onClick={this.submit.bind(this)}
              btnContent="完成"
            />
          </div>
        </Layout>
      </div>
    );
  }
}
export default Index;
