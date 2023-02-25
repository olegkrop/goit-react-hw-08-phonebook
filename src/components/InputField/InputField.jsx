import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './InputField.module.css';

export class InputField extends Component {
  render() {
    const { label, type, name, pattern, title, onChange, required } =
      this.props;

    return (
      <>
        <label className={style.contactFormLabel}>{label}</label>
        <input
          className={style.contactFormInput}
          type={type}
          name={name}
          pattern={pattern}
          title={title}
          required={required}
          onChange={onChange}
        />
      </>
    );
  }
}

InputField.propTypes = {
  onChange: PropTypes.func.isRequired,
};
