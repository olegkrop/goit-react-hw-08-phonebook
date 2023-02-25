import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ContactList.module.css';

export class ContactList extends Component {
  render() {
    const { filter, contacts, onRemove } = this.props;
    return (
      <>
        <ul className={style.list}>
          {contacts
            .filter(contact => {
              if (!filter) {
                return true;
              }
              const lowerName = contact.name.toLowerCase();
              const lowerFilter = filter.toLowerCase();
              return lowerName.includes(lowerFilter);
            })
            .map(contact => (
              <li key={contact.id}>
                {contact.name}: {contact.number}
                <button
                  className={style.button}
                  id={contact.id}
                  type="button"
                  onClick={onRemove}
                >
                  {' '}
                  Delete{' '}
                </button>
              </li>
            ))}
        </ul>
      </>
    );
  }
}

ContactList.propTypes = {
  onRemove: PropTypes.func,
  contacts: PropTypes.array,
  filter: PropTypes.string,
};
