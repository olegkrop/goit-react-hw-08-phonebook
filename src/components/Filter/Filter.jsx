import React from 'react';
import PropTypes from 'prop-types';
import style from './Filter.module.css';

export function Filter({ value, onChange }) {
  return (
    <label>
      <h2>Contacts</h2>

      <p className={style.label}>Find contacts by name</p>
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
