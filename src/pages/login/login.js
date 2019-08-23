import React, {Component} from 'react'
import {  Link } from 'react-router-dom'
import './login.css';
import Background from '../../images/login.png';
import Service from '../../compoment/service';
var sectionStyle = {
    width: "100%",
    padding: "0 0 0 0",
    margin: "0 auto",
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover' 
  };

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            ischecked:false,
            username:'',
            password:''
    }}
    ChangeUsername(e) {
        this.setState({
            username:e.target.value
        })
    };

    ChangePassword(e) {
        this.setState({
          password: e.target.value
        })
    }; 
    changecheck(e){
        var now = this.state.ischecked;
            this.setState({
                ischecked:!now
            })
        } 

    login(){
        Service.Login(this.state.username,this.state.password).then(
            res=>{
            if (res !== null && res!== undefined) {
                let landing = 'work.muxixyz.com/'
                if (landing) {
                        window.location.href = 'http://'+ landing + 'landing/?username=' + this.username +'&token=' + res.token + '&id=' + res.user_id
                    }
                } else {
                    this.failed = true
                }
            }
            )
        }
    render() {
        const {ischecked , username , password} = this.state;
        return (
            <div className="sign" style={sectionStyle} >
                <div className="main">
                    <div className="logo">
                       <img src={require('../../images/muxilogo.png')} alt=" " />
                    </div>
                    
                    <div className="sign-in-container" >
                        <div className="title" >
                        <div className="span1">登录</div>
                        <div className="span2"><Link to='/register' style={{ textDecoration: 'none',color: 'rgba(145,145,145,1)' }}>注册</Link></div>
                        </div>
                        <form method="post" >
                            
                            <div className="input-prepend" >
                                <input type="text"
                                    placeholder="用户名"
                                    value={username}
                                    onInput={this.ChangeUsername.bind(this)}
                                    onChange={this.ChangeUsername.bind(this)}
                                    className="session_nickname" />
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="密码"
                                    value={password}
                                    onInput={this.ChangePassword.bind(this)}
                                    onChange={this.ChangePassword.bind(this)}
                                    className="user_password" />
                            </div>
                            
                            <div className="auto-login-btn" >
                                <input type="checkbox"
                                    value="true"
                                    checked={ischecked}
                                    onChange={this.changecheck.bind(this)}
                                    name="session[auto_login]"
                                    className="session_auto_login" />  
                                    <div className="focus" onClick={this.changecheck.bind(this)}> 下次自动登陆 </div>
                                    <div className="find_pass"><Link to='/find_pass' style={{ textDecoration: 'none' }}>
                                         找回密码？ </Link></div>
                            </div>
                            <button className="sign-in-button focus" type="button" onClick={this.login.bind(this)}> 登录 </button>
                            

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;