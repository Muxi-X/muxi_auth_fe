import React, {Component} from 'react'
import Background from '../../images/login.png';
import "./index.css"

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
            ischecked:false,
    }}
    render() {
        return (          
                <div className="sign" style={sectionStyle} >
                    <div className="main">
                        <div className="logo">
                            <img src={require('../../images/muxilogo.png')} alt=" " />
                        </div>
                        <div className="sign-in-container" >
                            <div className="title" >找回密码</div>
                            <form method="post" >
                            
                            <div className="input-prepend1" >
                                <input type="text"
                                    placeholder="输入邮箱"
                                    name="session[nickname]"
                                    className="email_blank" />
                                    <button className="get_captcha focus" type="button" >发送</button>
                            </div>
                            <div className="input-prepend" >
                                <input type="text"
                                    placeholder="验证码"
                                    className="user_password" />
                            </div>
                            <button className="sign-in-button focus" type="button" > 下一步 </button>
                        </form>
                        </div>
                    </div>
                </div>
        )
    }
}
export default Index;