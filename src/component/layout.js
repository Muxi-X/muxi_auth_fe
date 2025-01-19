import React from 'react';
import Background from '../images/login.png';
import icon from '../images/logo-star.png';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <div
          className="sign background"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="main">
            <div className="logo">
              <div className="header">
                <img alt="logo" src={icon} className="icon"></img>
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
