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
            btnContent: '发送',
            btnDisable:false,
            time: 60,
            emailInput: '',
            captchaInput: '',
            info_email:''
    }}

    ChangeEmail(e){
      var val = e.target.value;
      var isTureEmail = false;
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
          // Service.getCaptcha(){
          // };
      }
    }
    Changecaptcha(e){
      this.setState({
        captchaInput: e.target.value
      });
    }
    next(e){
      // Server.

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
        
        const sendCode = () =>{
            this.setState({
              btnDisable: true,
              btnContent: "60s后重发",
            });
            //每隔一秒执行一次clock方法
            timeChange = setInterval(clock,1000);
          };

        const{btnDisable} = this.state;
        return (          
                <div className="sign" style={sectionStyle} >
                    <div className="main">
                        <div className="logo">
                            <img src={require('../../images/muxilogo.png')} alt=" " />
                        </div>
                        <div className="container" >
                            <div className="title" >找回密码</div>
                            <form method="post" >
                            
                            <div className="input-prepend1" >
                                <input type="text"
                                    placeholder="输入邮箱"
                                    name="email"
                                    onInput={this.ChangeEmail.bind(this)}
                                    onChange={this.ChangeEmail.bind(this)}
                                    className="email_blank" />
                                    <button type="primary" className={btnDisable?"get_captcha_unuse focus ":"get_captcha focus "} inline onClick={sendCode} disabled={btnDisable}>{this.state.btnContent}</button>
                                    <label className="emailtab" for="email">{this.state.info_email}</label>
                            </div>
                            <div className="margin-fix" >
                                <input type="text"
                                    placeholder="验证码"
                                    onInput={this.Changecaptcha.bind(this)}
                                    onChange={this.Changecaptcha.bind(this)}
                                    className="user_password" />
                            </div>
                            </form>
                            <Link to="/reset"><button className="next-button focus" type="button" onClick={this.next.bind(this)}>下一步 </button></Link> 

                        </div>
                    </div>
                </div>
        )
    }
}
export default Index;