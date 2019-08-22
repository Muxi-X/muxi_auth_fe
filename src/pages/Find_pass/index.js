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
            isWindowshowed:false,
            btnContent: '发送',
            btnDisable:false,
            time: 60,
    }}
    get_captcha(e){
        this.setState({
            isWindowshowed:!this.state.isWindowshowed
        })
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
                                    name="session[nickname]"
                                    className="email_blank" />
                                    {/* <button className="get_captcha focus" type="button" onClick={this.get_captcha.bind(this)} >发送 </button> */}
                                    <button type="primary" className={btnDisable?"get_captcha_unuse focus ":"get_captcha focus "} inline onClick={sendCode} disabled={btnDisable}>{this.state.btnContent}</button>
                            </div>
                            <div className={isWindowshowed?"remind":"none"}>测试一下下</div>
                            <div className="margin-fix" >
                                <input type="text"
                                    placeholder="验证码"
                                    className="user_password" />
                            </div>
                            <button className="next-button focus" type="button" > 下一步 </button>
                        </form>
                        </div>
                    </div>
                </div>
        )
    }
}
export default Index;