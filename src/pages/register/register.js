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
            isTureEmail:false,
            isRightPassword:false
    }}
    makePromise(value){
      return  new Promise((resolve, reject) => {
        Service.checkEmail(value).then(res => {
            resolve(res)
        },() => {
            reject()
        })
      })
    }
    makePromise_usr(value){
        return  new Promise((resolve, reject) => {
        Service.checkUsername(value).then(res => {
            resolve(res)
        },() => {
            reject()
        })
      })
    }
    makePromise_re(a,b,c){
        return  new Promise((resolve, reject) => {
        Service.register(a,b,c).then(res => {
            resolve(res)
        },() => {
            reject()
        })
      })
    }
    usrOnBlur(e){
        var val = e.target.value;
        var result;
        if(!this.state.username){
            this.setState({"info_usr":"用户名不能为空"});
            setTimeout(function(){
                this.setState({"info_usr":""});
            }.bind(this),5000);
        }else{
            this.makePromise_usr(val).then(
                res =>{
                    console.log(res);
                    result = res.ok;
                    this.setState({
                        isUserUsed:res.ok
                    })
                    if(result === true){
                        this.setState({"info_usr":"恭喜你，该用户名暂未被使用。"});
                        setTimeout(function(){
                            this.setState({"info_usr":""});
                        }.bind(this),5000);
                    }else{
                        this.setState({"info_usr":"该用户名已被注册!"});
                        setTimeout(function(){
                            this.setState({"info_usr":""});
                        }.bind(this),5000);
                    }
                    }).catch(
                () =>{
                    result = false;
                    this.setState({
                        isUserUsed:false
                    })
                    this.setState({"info_usr":"该用户名已被注册!"});
                    setTimeout(function(){
                        this.setState({"info_usr":""});
                    }.bind(this),5000);
                })
        }
    }
    ChangeUsername(e) {
        var val = e.target.value;
        this.setState({"username":val.substring(0,15)});
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
            }.bind(this),5000);
        }else{
            this.setState({"info_email":""});
            this.setState({isTureEmail:true});
            this.makePromise(val).then(
                res =>{
                    result = res.ok;
                    this.setState({
                        isEmailUsed:res.ok
                    })
                    if(result === true){
                        this.setState({"info_email":"恭喜你，该邮箱未被使用"});
                        setTimeout(function(){
                            this.setState({"info_email":""});
                        }.bind(this),5000);
                    }else{
                        this.setState({"info_email":"该邮箱已被使用!"});
                        setTimeout(function(){
                            this.setState({"info_email":""});
                        }.bind(this),5000);
                    }
                }
            ).catch(
                ()=>{
                    result = false;
                    this.setState({
                        isEmailUsed:false
                    })
                    this.setState({"info_email":"该邮箱已被使用!"});
                    setTimeout(function(){
                        this.setState({"info_email":""});
                    }.bind(this),5000);
                }
            )}
        }

    ChangeFPassword(e) {
        var val = e.target.value;
        var length = val.length;
        this.setState({"f_password":val.substring(0,15)});
        if(length > 15){
            this.setState({"info_f_password":"不能输入超过15个字!"});
        }else{
            this.setState({"info_f_password":""});
        }
        if(length < 8){
            this.setState({"info_f_password":"不能输入低于8个字!"});
        }else{
            this.setState({"info_f_password":""});
        }
        if(length > 8 && length < 15){
            this.setState({
                isRightPassword:true
            })
        }
    }

    ChangeSPassword(e) {
        var val = e.target.value;
        this.setState({"s_password":val.substring(0,15)});

        if(val !== this.state.f_password){
            this.setState({"info_s_password":"前后两次输入密码不一致!"});
        }else{
            this.setState({"info_s_password":"密码一致"});
            setTimeout(function(){
                this.setState({"info_s_password":""});
            }.bind(this),5000);
        }
    }
    register(){
        if(this.state.isEmailUsed && this.state.isUserUsed && (this.state.s_password===this.state.f_password)){
            this.makePromise_re(this.state.email , this.state.username, this.state.s_password).then(
                res =>{
                    alert("注册成功")
                    window.location.href = '/login'
                    }).catch(
                () =>{
                    alert("注册失败（未知的错误）")
            })
        }
        else{
            alert("注册失败，请检查重试")
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
                                    onBlur={this.usrOnBlur.bind(this) }
                                    onChange={this.ChangeUsername.bind(this)}
                                    className="user_nickname" />
                                <label for="username">{this.state.info_usr}</label>
                            </div>
                            <div className="input-prepend" >
                                <input type="email"
                                    placeholder="登录邮箱"
                                    value={email}
                                    name="email"
                                    onChange={this.ChangeEmail.bind(this)}
                                    className="user_email_number" />
                                <label for="email">{this.state.info_email}</label>
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="密码"
                                    value={f_password}
                                    name="f_password"
                                    onChange={this.ChangeFPassword.bind(this)}
                                    className="user_password" />
                                <label for="f_password">{this.state.info_f_password}</label>
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="确认密码"
                                    value={s_password}
                                    name="s_password"
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