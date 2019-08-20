import React, {Component} from 'react'
import './login.css';
import Background from '../../images/login.png';
import Post from '../../compoment/request'
var sectionStyle = {
    width: "100%",
    padding: "0 0 0 0",
    margin: "0 auto",
  // makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover' 
  };

class Login extends Component {
    state = {
        username:'',
        email:'',
        f_password:'',
        s_password:''
    }
    ChangeUsername(e) {
        this.setState({
          username: e.detail.value
        });
    }
    ChangeEmail(e) {
        this.setState({
          email: e.detail.value
        });
    } 
    ChangeFPassword(e) {
        this.setState({
          f_password: e.detail.value
        });
    }
    ChangeSPassword(e) {
        this.setState({
          s_password: e.detail.value
        });
    }
    login(){
        Post('',{

        }).then((res)=>{
            if(res){
                
            }           
        })
    }
    render() {
        const { username , email , f_password , s_password}= this.state
        return (
            <div className="sign" style={sectionStyle} >
                <div className="main">
                    <div className="logo">
                       <img src={require('../../images/muxilogo.png')} alt=" " />
                    </div>
                    
                    <div className="sign-in-container" >
                        <div className="title" >登录</div>
                        <form method="post" >
                            <div className="input-prepend" >
                                <input type="text"
                                    placeholder="用户名"
                                    value={username}
                                    onInput={this.ChangeUsername}
                                    onChange={this.ChangeUsername}
                                    className="user_nickname" />
                            </div>
                            <div className="input-prepend" >
                                <input type="email"
                                    placeholder="登录邮箱"
                                    value={email}
                                    onInput={this.ChangeEmail}
                                    onChange={this.ChangeEmail}
                                    className="user_email_number" />
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="密码"
                                    value={f_password}
                                    onInput={this.ChangeFPassword}
                                    onChange={this.ChangeFPassword}
                                    className="user_password" />
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="确认密码"
                                    value={s_password}
                                    onInput={this.ChangeSPassword}
                                    onChange={this.ChangeSPassword}
                                    className="user_confi_password" />
                            </div>
                            <div className="auto-login-btn" >
                                <input type="checkbox"
                                    value="true"
                                    checked="check"
                                    name="session[auto_login]"
                                    className="session_auto_login" />  <span > 下次自动登陆 </span>
                            </div>
                            <button className="sign-in-button" type="button" onClick={this.login} > 开启新世界大门 </button>
                            <p className="sign-in-msg" > 以上设置可在页面右上角个人信息中再次修改 </p>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;