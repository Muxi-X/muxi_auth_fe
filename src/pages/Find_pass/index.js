import React, {Component} from 'react'
import Background from '../../images/login.png';
import "./index.css"
// import { Server } from 'https';
import Service from '../../compoment/service';


class Index extends Component {
        constructor(props){
        super(props);
        this.state = {
            isTureEmail:false,
            isTureCaptcha:false,
            btnContent: '发送',
            btnDisable:false,
            time: 60,
            info:'',
            secondInfo:'',
            emailInput: '',
            captchaInput: '',
            infoEmail:'',
            firstPassword:'',
            secondPassword:''
    }}

    changeEmail(e){
      var isTureEmail = false;
      var val = e.target.value;
      var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      this.setState({"emailInput":val.substring(0,20)});
      if (myReg.test(val)){
        isTureEmail = true;
      }
      if(isTureEmail !== true){
          this.setState({"infoEmail":"输入的邮箱格式有误"});
          this.setState({isTureEmail:false});
          setTimeout(function(){
              this.setState({"infoEmail":""});
          }.bind(this),1000);
      }else{
          this.setState({"infoEmail":""});
          this.setState({isTureEmail:true});
      }
    }
    changeCaptcha(e){
      this.setState({
        captchaInput: e.target.value
      });
    }
    makePromiseEm(email, captcha){
      return  new Promise((resolve, reject) => {
        Service.checkCaptcha(email, captcha).then(res => {
            resolve(res)
        },() => {
            reject()
        })
      })
    }
    makePromiseRp(email, password, captcha){
      return  new Promise((resolve, reject) => {
        Service.resetPassword(email, password, captcha).then(res => {
            resolve(res)
        },() => {
            reject()
        })
      })
    }
    makePromiseSd(email){
      return  new Promise((resolve, reject) => {
        Service.getCaptcha(email).then(res => {
            resolve(res)
        },() => {
            reject()
        })
      })
    }


    submit(e){
      var first = this.state.firstPassword;
      var second = this.state.secondPassword;
      var email = this.state.emailInput;
      var captcha = this.state.captchaInput;
      var result = "";
      if( first===second && first.length > 8){
      this.makePromiseEm(email , captcha).then(
        res =>{
            result = res.message;
            console.log(result);

            if(result === "OK"){
              this.setState({
                isTureCaptcha:true
              })
              this.makePromiseRp(email , second , captcha).then(
                res =>{
                    alert("重置成功")
                    window.location.href='/login'
                  }).catch(
                () =>{
                    alert("重置失败，请检查重试")
                })

              }else {
                alert("验证码输入错误")
              }
            }).catch(
        () =>{
            alert("验证码错误")
        })



     }else{
       alert("输入的两次密码不一致")
     }
    }
    changeFristPassword(e){
        var val = e.target.value;
        var length = val.length;
        this.setState({"firstPassword":val.substring(0,15)});
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
    changesecondPassword(e){
        var val = e.target.value;
        this.setState({"secondPassword":val.substring(0,15)});

        if(val !== this.state.firstPassword){
            this.setState({"secondInfo":"前后两次输入密码不正确!"});
            setTimeout(function(){
                this.setState({"secondInfo":""});
            }.bind(this),1000);
        }else{
            this.setState({"secondInfo":""});
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
        
        const sendCode = () =>{
            if(this.state.isTureEmail === true){ 
              // Service.getCaptcha(this.state.emailInput).then(
              //   res=>{
              //     if (res !== null && res!== undefined) {
              //       alert("验证码发送成功")
              //   }
              //  }
            //)
            
            this.makePromiseSd(emailInput).then(
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

        const{btnDisable , captchaInput , emailInput ,secondPassword ,firstPassword, secondInfo, info, btnContent, infoEmail} = this.state;
        return (          
                <div className="sign" style={{backgroundImage: `url(${Background})`}} className="background">
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
                                    onChange={this.changeEmail.bind(this)}
                                    className="email-blank" />
                                    <button type="primary" className={btnDisable?"get-captcha-unuse focus ":"get-captcha focus "} inline onClick={sendCode} disabled={btnDisable}>{btnContent}</button>
                                    <label className="emailtab" for="email">{infoEmail}</label>
                            </div>
                            <div className="margin-fix" >
                                <input type="text"
                                    placeholder="验证码"
                                    value={captchaInput}
                                    onChange={this.changeCaptcha.bind(this)}
                                    className="user-password" />
                            </div>
                            <form method="post" >
                            <div className="input-prepend" >
                                <input type="password"
                                placeholder="请输入新密码"
                                value={firstPassword}
                                name="firstPassword"
                                onChange={this.changeFristPassword.bind(this)}
                                className="user-nickname" />
                                <label for="firstPassword">{info}</label>
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="请再次输入新密码"
                                    value={secondPassword}
                                    name="secondPassword"
                                    onChange={this.changesecondPassword.bind(this)}
                                    className="user-confi-password" />
                                <label for="secondPassword">{secondInfo}</label>
                                </div>
                            </form>
                            <button className="next-button focus" type="button" onClick={this.submit.bind(this)}>完成 </button>
                        </div>
                    </div>
                </div>
        )
    }
}
export default Index;