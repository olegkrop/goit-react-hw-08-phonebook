import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Filter.module.css';

export class Filter extends Component {
  render() {
    const { filter, onSearch } = this.props;
    return (
      <>
        <p className={style.filterTitle}>Find contacts by name</p>
        <input
          className={style.filterInput}
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
