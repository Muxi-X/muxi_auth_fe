import React, {Component} from 'react'
import Background from '../../images/login.png';
import "./index.css"
import {  Link } from 'react-router-dom'
// import { Server } from 'https';
// import Service from '../../compoment/service'

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
            isWindowshowed:false,
            btnContent: '发送',
            btnDisable:false,
            time: 60,
            emailInput: '',
            captchaInput: '',
            start: false,
            code: false,
            wrong: false
    }}
    get_captcha(e){
    //   sendCode(value) {
    //     value.stopPropagation();
    //     value.preventDefault();
    //     console.log(this.emailInput)
    //     if (this.$v.emailInput.email && !this.$v.emailInput.isUnique && this.$v.emailInput.required) {
    //         Service.getCaptcha(this.emailInput).then(res => {
    //             if (res!== null && res !== undefined) {
    //                 this.start = true
    //                 this.code = true
    //             }
    //         })
    //     }
    // }
        this.setState({
            isWindowshowed:!this.state.isWindowshowed
        })
    }
    ChangeEmail(e){
      this.setState({
        emailInput: e.target.value
      });
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

        const{btnDisable,isWindowshowed} = this.state;
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
                                    onInput={this.ChangeEmail.bind(this)}
                                    onChange={this.ChangeEmail.bind(this)}
                                    className="email_blank" />
                                    {/* <button className="get_captcha focus" type="button" onClick={this.get_captcha.bind(this)} >发送 </button> */}
                                    <button type="primary" className={btnDisable?"get_captcha_unuse focus ":"get_captcha focus "} inline onClick={sendCode} disabled={btnDisable}>{this.state.btnContent}</button>
                            </div>
                            <div className={isWindowshowed?"remind":"none"}>测试一下下</div>
                            <div className="margin-fix" >
                                <input type="text"
                                    placeholder="验证码"
                                    onInput={this.Changecaptcha.bind(this)}
                                    onChange={this.Changecaptcha.bind(this)}
                                    className="user_password" />
                            </div>
                            <Link to="/reset"><button className="next-button focus" type="button" onClick={this.next.bind(this)}>下一步 </button></Link> 
                        </form>
                        </div>
                    </div>
                </div>
        )
    }
}
export default Index;