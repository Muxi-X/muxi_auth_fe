import React, {Component} from 'react'
import Background from '../../images/login.png';
import "./index.css"
import {  Link } from 'react-router-dom'
// import { Server } from 'https';
import Service from '../../compoment/service';


var sectionStyle = {
    width: "100%",
    padding: "0 0 0 0",
    margin: "0 auto",
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover' 
  };

class Index extends Component {
        constructor(props){
        super(props);
        this.state = {
            isTureEmail:false,
            isTureCaptcha:false,
            btnContent: '发送',
            btnDisable:false,
            time: 60,
            emailInput: '',
            captchaInput: '',
            info_email:'',
            f_password:'',
            s_password:''
    }}

    ChangeEmail(e){
      var isTureEmail = false;
      var val = e.target.value;
      var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      this.setState({"emailInput":val.substring(0,20)});
      if (myReg.test(val)){
        isTureEmail = true;
      }
      if(isTureEmail !== true){
          this.setState({"info_email":"输入的邮箱格式有误"});
          this.setState({isTureEmail:false});
          setTimeout(function(){
              this.setState({"info_email":""});
          }.bind(this),1000);
      }else{
          this.setState({"info_email":""});
          this.setState({isTureEmail:true});
      }
    }
    Changecaptcha(e){
      this.setState({
        captchaInput: e.target.value
      });
    }
    makePromise_em(email, captcha){
      return  new Promise((resolve, reject) => {
        Service.checkCaptcha(email, captcha).then(res => {
            resolve(res)
        },() => {
            reject()
        })
      })
    }
    makePromise_rp(email, password, captcha){
      return  new Promise((resolve, reject) => {
        Service.resetPassword(email, password, captcha).then(res => {
            resolve(res)
        },() => {
            reject()
        })
      })
    }
    makePromise_sd(email){
      return  new Promise((resolve, reject) => {
        Service.getCaptcha(email).then(res => {
            resolve(res)
        },() => {
            reject()
        })
      })
    }

    next(e){
      this.makePromise_em(this.state.emailInput,this.state.captchaInput).then(
        res =>{
            this.setState({
              isTureCaptcha:true
            })
          }).catch(
        () =>{
            alert("验证码错误")
        })
    }

    submit(e){
      var first = this.state.f_password;
      var second = this.state.s_password;
      var email = this.state.emailInput;
      var captcha = this.state.captchaInput;
      if( (first===second) && this.state.isTureCaptcha){
      this.makePromise_rp(email , second , captcha).then(
        res =>{
            alert("重置成功")
            window.location.href='/login'
          }).catch(
        () =>{
            alert("验证码错误")
        })
      }
      else {
        alert("验证码错误")
      }
    }
    Changef_password(e){
        var val = e.target.value;
        var length = val.length;
        this.setState({"f_password":val.substring(0,15)});
        if(length > 15){
            this.setState({"info":"不能输入超过15个字!"});
            setTimeout(function(){
                this.setState({"info":""});
            }.bind(this),1000);
        }else{
            this.setState({"info":""});
        }
        if(length < 8){
            this.setState({"info":"不能输入低于8个字!"});
            setTimeout(function(){
                this.setState({"info":""});
            }.bind(this),1000);
        }else{
            this.setState({"info":""});
        }
    }
    Changesec_password(e){
        var val = e.target.value;
        this.setState({"s_password":val.substring(0,15)});

        if(val !== this.state.f_password){
            this.setState({"info_s":"前后两次输入密码不正确!"});
            setTimeout(function(){
                this.setState({"info_s":""});
            }.bind(this),1000);
        }else{
            this.setState({"info_s":""});
        }
    }


    render() {
        let timeChange;
        let ti = this.state.time;
        //关键在于用ti取代time进行计算和判断，因为time在render里不断刷新，但在方法中不会进行刷新
        const clock =()=>{
          if (ti > 0) {
            //当ti>0时执行更新方法
             ti = ti - 1;
             this.setState({
                time: ti,
                btnContent: ti + "s后重发",
              });
             console.log(ti);
          }else{
            //当ti=0时执行终止循环方法
            clearInterval(timeChange);
            this.setState({
              btnDisable: false,
              time: 60,
              btnContent: "发送",
            });
          }
        };
        
        const sendCode = () =>{console.log(this.state.isTureEmail, 123);
            if(this.state.isTureEmail === true){ 
              // Service.getCaptcha(this.state.emailInput).then(
              //   res=>{
              //     if (res !== null && res!== undefined) {
              //       alert("验证码发送成功")
              //   }
              //  }
            //)
            
            this.makePromise_sd(emailInput).then(
              res =>{
                alert("验证码发送成功")
                this.setState({
                  btnDisable: true,
                  btnContent: "60s后重发",
                });
                //每隔一秒执行一次clock方法
                timeChange = setInterval(clock,1000);
              }).catch(
            () =>{
                alert("验证码发送失败")
             }
            )
            }else{
              alert("验证码发送失败，请检查重试")
            }
        }

        const{btnDisable , captchaInput , emailInput ,s_password ,f_password} = this.state;
        return (          
                <div className="sign" style={sectionStyle} >
                    <div className="main">
                        <div className="logo">
                            <img src={require('../../images/muxilogo.png')} alt=" " />
                        </div>
                        <div className="container" >
                            <div className="title" >找回密码</div>
                            
                            <div className="input-prepend1" >
                                <input type="text"
                                    placeholder="输入邮箱"
                                    name="email"
                                    value={emailInput}
                                    onChange={this.ChangeEmail.bind(this)}
                                    className="email_blank" />
                                    <button type="primary" className={btnDisable?"get_captcha_unuse focus ":"get_captcha focus "} inline onClick={sendCode} disabled={btnDisable}>{this.state.btnContent}</button>
                                    <label className="emailtab" for="email">{this.state.info_email}</label>
                            </div>
                            <div className="margin-fix" >
                                <input type="text"
                                    placeholder="验证码"
                                    value={captchaInput}
                                    onChange={this.Changecaptcha.bind(this)}
                                    className="user_password" />
                            </div>
                            <form method="post" >
                            <div className="input-prepend" >
                                <input type="password"
                                placeholder="请输入新密码"
                                value={f_password}
                                name="f_password"
                                onChange={this.Changef_password.bind(this)}
                                className="user_nickname" />
                                <label for="f_password">{this.state.info}</label>
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="请再次输入新密码"
                                    value={s_password}
                                    name="s_password"
                                    onInput={this.Changesec_password.bind(this)}
                                    onChange={this.Changesec_password.bind(this)}
                                    className="user_confi_password" />
                                <label for="s_password">{this.state.info_s}</label>
                                </div>
                            </form>
                            <button className="next-button focus" type="button" onClick={this.next.bind(this)}>完成 </button>
                        </div>
                    </div>
                </div>
        )
    }
}
export default Index;