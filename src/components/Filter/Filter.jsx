import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Filter.module.css';

export class Filter extends Component {
  render() {
    const { filter, onSearch } = this.props;
    return (
      <>
        <p className={style.title}>Find contacts by name</p>
        <input
          className={style.input}
          type="text"
          value={filter}
          onChange={onSearch}
        />
      </>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string,
  onSearch: PropTypes.func,
};
