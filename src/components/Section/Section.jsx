import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Section.module.css';

export class Section extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <section className={style.section}>
        <h2 className={style.title}>{title}</h2>
        {children}
      </section>
    );
  }
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
};
