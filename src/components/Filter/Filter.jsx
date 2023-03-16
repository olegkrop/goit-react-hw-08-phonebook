import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter as changeFilterAction } from '../../redux/contactsSlice';
import style from './Filter.module.css';

const Filter = () => {
  const { filter } = useSelector(store => {
    return store.contacts;
  });

  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(changeFilterAction(e.target.value));
  };

  return (
    <label>
      <p className={style.label}>Find contacts by name</p>
      <input type="text" value={filter} onChange={onChange} />
    </label>
  );
};

export default Filter;

// const Filter = ({ value, onChange }) => {
//   return (
//     <label>
//       <h2>Contacts</h2>

//       <p className={style.label}>Find contacts by name</p>
//       <input type="text" value={value} onChange={onChange} />
//     </label>
//   );
// };

// Filter.propTypes = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };
// export default Filter;
