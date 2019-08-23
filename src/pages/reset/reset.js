import React, {Component} from 'react'
import './reset.css';
// import {  Link } from 'react-router-dom'
import Background from '../../images/login.png';
// import Service from '../../compoment/service'
var sectionStyle = {
    width: "100%",
    padding: "0 0 0 0",
    margin: "0 auto",
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover' 
  };

  class  Reset extends Component {
    constructor(props){
        super(props);
        this.state = {
            emailInput: '',
            captchaInput: '',
            f_password:'',
            s_password:'',
            info:"",
            info_s:""
    }
}
    submit(e){
        var first = this.state.f_password;
        var second = this.state.s_password;
        if(first === second && first.length >= 8){
            // Service.
            alert("修改成功");
        }else{
            alert("您输入的密码有误，请检查重试");
            this.setState({
                f_password:'',
                s_password:''
            })
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
        const {  f_password , s_password }= this.state
        return (
            <div className="sign" style={sectionStyle} >
                <div className="main">
                    <div className="logo">
                    <img src={require('../../images/muxilogo.png')} alt=" " />
                    </div>
                    <div className="container" >
                        <div className="title" >
                            <div className="span">找回密码</div>
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
                    <button className="next-button focus" type="button" onClick={this.submit.bind(this)}> 完成 </button>
                </div>
            </div>
        </div>
        )
    }
}
export default Reset;