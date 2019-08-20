import React, {Component} from 'react'
import './login.css';
import Background from '../../images/login.png';
var sectionStyle = {
    width: "100%",
    padding: "120px 0 0 0",
    margin: "0 auto",
  // makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover' 
  };

class Login extends Component {
    render() {
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
                                < input type="text"
                                    placeholder="用户名"
                                    name="session[nickname]"
                                    className="session_nickname" />
                            </div>
                            <div className="input-prepend" >
                                < input type="password"
                                    placeholder="密码"
                                    name="session[password]"
                                    className="user_password" />
                            </div>
                            
                            <div className="auto-login-btn" >
                                <input type="checkbox"
                                    value="true"
                                    checked="check"
                                    name="session[auto_login]"
                                    className="session_auto_login" />  < span > 下次自动登陆 </span>
                            </div>
                            <button className="sign-in-button" type="button" > 登录 </button>
                            

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;