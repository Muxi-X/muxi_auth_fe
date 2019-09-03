import React, {Component} from 'react'
import './register.css';
import {  Link } from 'react-router-dom'
import Background from '../../images/login.png';
import Service from '../../compoment/service'

class  Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            email:'',
            fristPassword:'',
            secondPassword:'',
            infoUsr:'',
            infoEmail:'',
            infoFristPassword:'',
            infoSecondPassword:'',
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
    makePromiseUsr(value){
        return  new Promise((resolve, reject) => {
        Service.checkUsername(value).then(res => {
            resolve(res)
        },() => {
            reject()
        })
      })
    }
    makePromiseRe(a,b,c){
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
            this.setState({"infoUsr":"用户名不能为空"});
            setTimeout(function(){
                this.setState({"infoUsr":""});
            }.bind(this),5000);
        }else{
            this.makePromiseUsr(val).then(
                res =>{
                    console.log(res);
                    result = res.ok;
                    this.setState({
                        isUserUsed:res.ok
                    })
                    if(result === true){
                        this.setState({"infoUsr":"恭喜你，该用户名暂未被使用。"});
                        setTimeout(function(){
                            this.setState({"infoUsr":""});
                        }.bind(this),5000);
                    }else{
                        this.setState({"infoUsr":"该用户名已被注册!"});
                        setTimeout(function(){
                            this.setState({"infoUsr":""});
                        }.bind(this),5000);
                    }
                    }).catch(
                () =>{
                    result = false;
                    this.setState({
                        isUserUsed:false
                    })
                    this.setState({"infoUsr":"该用户名已被注册!"});
                    setTimeout(function(){
                        this.setState({"infoUsr":""});
                    }.bind(this),5000);
                })
        }
    }
    changeUsername(e) {
        var val = e.target.value;
        this.setState({"username":val.substring(0,15)});
        }


    changeEmail(e) {
        var result = false;
        var isTureEmail = false;
        var val = e.target.value;
        var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        this.setState({"email":val.substring(0,30)});
        if (myReg.test(val)){
          isTureEmail = true;
        }
        if(isTureEmail !== true){
            this.setState({"infoEmail":"输入的邮箱格式有误"});
            this.setState({isTureEmail:false});
            setTimeout(function(){
                this.setState({"infoEmail":""});
            }.bind(this),5000);
        }else{
            this.setState({"infoEmail":""});
            this.setState({isTureEmail:true});
            this.makePromise(val).then(
                res =>{
                    result = res.ok;
                    this.setState({
                        isEmailUsed:res.ok
                    })
                    if(result === true){
                        this.setState({"infoEmail":"恭喜你，该邮箱未被使用"});
                        setTimeout(function(){
                            this.setState({"infoEmail":""});
                        }.bind(this),5000);
                    }else{
                        this.setState({"infoEmail":"该邮箱已被使用!"});
                        setTimeout(function(){
                            this.setState({"infoEmail":""});
                        }.bind(this),5000);
                    }
                }
            ).catch(
                ()=>{
                    result = false;
                    this.setState({
                        isEmailUsed:false
                    })
                    this.setState({"infoEmail":"该邮箱已被使用!"});
                    setTimeout(function(){
                        this.setState({"infoEmail":""});
                    }.bind(this),5000);
                }
            )}
        }

    changeFristPassword(e) {
        var val = e.target.value;
        var length = val.length;
        this.setState({"fristPassword":val.substring(0,15)});
        if(length > 15){
            this.setState({"infoFristPassword":"不能输入超过15个字!"});
        }else{
            this.setState({"infoFristPassword":""});
        }
        if(length < 8){
            this.setState({"infoFristPassword":"不能输入低于8个字!"});
        }else{
            this.setState({"infoFristPassword":""});
        }
        if(length > 8 && length < 15){
            this.setState({
                isRightPassword:true
            })
        }
    }

    changeSecondPassword(e) {
        var val = e.target.value;
        this.setState({"secondPassword":val.substring(0,15)});

        if(val !== this.state.fristPassword){
            this.setState({"infoSecondPassword":"前后两次输入密码不一致!"});
        }else{
            this.setState({"infoSecondPassword":"密码一致"});
            setTimeout(function(){
                this.setState({"infoSecondPassword":""});
            }.bind(this),5000);
        }
    }
    register(){
        if(this.state.isEmailUsed && this.state.isUserUsed && (this.state.secondPassword===this.state.fristPassword)){
            this.makePromiseRe(this.state.email , this.state.username, this.state.secondPassword).then(
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
        const { username , email , fristPassword , secondPassword, infoUsr, infoEmail, infoFristPassword, infoSecondPassword }= this.state;
        return (
            <div className="sign" style={{backgroundImage: `url(${Background})`}} className="background">
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
                                    onChange={this.changeUsername.bind(this)}
                                    className="user_nickname" />
                                <label for="username">{infoUsr}</label>
                            </div>
                            <div className="input-prepend" >
                                <input type="email"
                                    placeholder="登录邮箱"
                                    value={email}
                                    name="email"
                                    onChange={this.changeEmail.bind(this)}
                                    className="user_email_number" />
                                <label for="email">{infoEmail}</label>
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="密码"
                                    value={fristPassword}
                                    name="fristPassword"
                                    onChange={this.changeFristPassword.bind(this)}
                                    className="user_password" />
                                <label for="fristPassword">{infoFristPassword}</label>
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="确认密码"
                                    value={secondPassword}
                                    name="secondPassword"
                                    onChange={this.changeSecondPassword.bind(this)}
                                    className="user_confi_password" />
                                <label for="secondPassword">{infoSecondPassword}</label>
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