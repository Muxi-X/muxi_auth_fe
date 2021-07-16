import React from 'react';
import Background from '../images/login.png';
import icon from '../images/logo-star.png';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <div
          //         className="sign"
          style={{ backgroundImage: `url(${Background})` }}
          className="background"
        >
          <div className="main">
            <div className="logo">
              <div className="header">
                <img src={icon} alt="tupian" className="icon"></img>
                木犀内网门户
              </div>
            </div>
            <div>{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Layout;
