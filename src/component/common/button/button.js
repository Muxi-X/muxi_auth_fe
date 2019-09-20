import React from 'react';
import './button.css';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, onClick, disabled, btnContent, className } = this.props;
    return (
      <button
        className={className ? className : 'standard-button'}
        type={type}
        onClick={onClick}
        disabled={disabled ? true : false}
      >
        {btnContent}
      </button>
    );
  }
}
export default Button;
