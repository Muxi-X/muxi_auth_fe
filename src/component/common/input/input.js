import React from 'react';
import './input.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, placeholder, value, onChange, className, name } = this.props;
    return (
      <input
        className={className ? className : 'standard'}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    );
  }
}
export default Input;
