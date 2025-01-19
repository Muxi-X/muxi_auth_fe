import React from 'react';
import './input.css';

const noop = () => {};

class Input extends React.Component {
  render() {
    const {
      type,
      placeholder,
      value,
      onChange,
      className,
      name,
      onBlur = noop
    } = this.props;
    return (
      <input
        className={className ? className : 'standard'}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
      />
    );
  }
}
export default Input;
