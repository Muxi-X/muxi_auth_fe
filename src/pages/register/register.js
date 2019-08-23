import React, {Component} from 'react'
import './register.css';
import {  Link } from 'react-router-dom'
import Background from '../../images/login.png';
import Service from '../../compoment/service'
var sectionStyle = {
    width: "100%",
    padding: "0 0 0 0",
    margin: "0 auto",
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover' 
  };

class  Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            email:'',
            f_password:'',
            s_password:'',
            info_usr:'',
            info_email:'',
            info_f_password:'',
            info_s_password:'',
            isUserUsed:false,
            isEmailUsed:false,
            isTureEmail:false
    }}
    ChangeUsername(e) {
        var result = false;
        Service.checkUsername(e.target.value).then(
            res =>{
                result = res.ok;
                this.setState({
                    isUserUsed:res.ok
                })
            }
        )
        var val = e.target.value;
        this.setState({"username":val.substring(0,15)});
        if(result === false){
            this.setState({"info_usr":"该用户名已被注册!"});
            setTimeout(function(){
                this.setState({"info_usr":""});
            }.bind(this),1000);
        }else{
            this.setState({"info_usr":""});
        }
    }

    ChangeEmail(e) {
        var result = false;
        var isTureEmail = false;
        var val = e.target.value;
        var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        this.setState({"email":val.substring(0,30)});
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
            Service.checkEmail(e.target.value).then(
                res =>{
                    result = res.ok;
                    this.setState({
                        isEmailUsed:res.ok
                    })
                }
            )
            this.setState({"email":val.substring(0,30)});
            if(result === false){
                this.setState({"info_email":"该邮箱已被使用!"});
                setTimeout(function(){
                    this.setState({"info_email":""});
                }.bind(this),1000);
            }else{
                this.setState({"info_email":""});
            }
        }
    }

    ChangeFPassword(e) {
        var val = e.target.value;
        var length = val.length;
        this.setState({"f_password":val.substring(0,15)});
        if(length > 15){
            this.setState({"info_f_password":"不能输入超过15个字!"});
            setTimeout(function(){
                this.setState({"info_f_password":""});
            }.bind(this),1000);
        }else{
            this.setState({"info_f_password":""});
        }
        if(length < 8){
            this.setState({"info_f_password":"不能输入低于8个字!"});
            setTimeout(function(){
                this.setState({"info_f_password":""});
            }.bind(this),1000);
        }else{
            this.setState({"info_f_password":""});
        }
    }

    ChangeSPassword(e) {
        var val = e.target.value;
        this.setState({"s_password":val.substring(0,15)});

        if(val !== this.state.f_password){
            this.setState({"info_s_password":"前后两次输入密码不正确!"});
            setTimeout(function(){
                this.setState({"info_s_password":""});
            }.bind(this),1000);
        }else{
            this.setState({"info_s_password":""});
        }
    }
    register(){
        if(this.state.s_password===this.state.f_password){
        Service.register(this.state.email , this.state.username, this.state.s_password).then(res=>{
            if (res !== null && res!== undefined) {
                alert("注册成功")
                window.location.href = '/login'
            } else {
                this.failed = true
            }
            }
        )}
        else{
            alert("两次输入密码不一致")
        }
    }
    render() {
        const { username , email , f_password , s_password }= this.state
        return (
            <div className="sign" style={sectionStyle} >
                <div className="main">
                    <div className="logo">
                       <img src={require('../../images/muxilogo.png')} alt=" " />
                    </div>
                    
                    <div className="sign-in-container" >
                    <div className="title" >
                        <div className="span2"><Link to='/login' style={{ textDecoration: 'none',color: 'rgba(145,145,145,1)' }}>登录</Link></div>
                        <div className="span1">注册</div>
                        </div>
                        <form method="post" >
                            <div className="input-prepend" >
                                <input type="text"
                                    placeholder="用户名"
                                    value={username}
                                    name="username"
                                    onInput={this.ChangeUsername.bind(this)}
                                    onChange={this.ChangeUsername.bind(this)}
                                    className="user_nickname" />
                                <label for="username">{this.state.info_usr}</label>
                            </div>
                            <div className="input-prepend" >
                                <input type="email"
                                    placeholder="登录邮箱"
                                    value={email}
                                    name="email"
                                    onInput={this.ChangeEmail.bind(this)}
                                    onChange={this.ChangeEmail.bind(this)}
                                    className="user_email_number" />
                                <label for="email">{this.state.info_email}</label>
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="密码"
                                    value={f_password}
                                    name="f_password"
                                    onInput={this.ChangeFPassword.bind(this)}
                                    onChange={this.ChangeFPassword.bind(this)}
                                    className="user_password" />
                                <label for="f_password">{this.state.info_f_password}</label>
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="确认密码"
                                    value={s_password}
                                    name="s_password"
                                    onInput={this.ChangeSPassword.bind(this)}
                                    onChange={this.ChangeSPassword.bind(this)}
                                    className="user_confi_password" />
                                <label for="s_password">{this.state.info_s_password}</label>
                            </div>
                            <button className="sign-in-button focus" type="button" onClick={this.register.bind(this)} > 开启新世界大门 </button>
                            <p className="sign-in-msg" > 以上设置可在页面右上角个人信息中再次修改 </p>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;