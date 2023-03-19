import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';

import style from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(store => {
    return store.filter.value;
  });

  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={style.container}>
      <label className={style.label}>
        <div className={style.title}>Find contact by name: </div>
        <input
          type="text"
          value={filter}
          onChange={onChange}
          className={style.input}
          placeholder="Contact name"
        />
      </label>
    </div>
  );
};

export default Filter;
