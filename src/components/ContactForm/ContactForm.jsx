import { useState } from 'react';
import PropTypes from 'prop-types';
import style from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => {
    setName(e.currentTarget.value);
  };

  const handleNumberChange = e => {
    setNumber(e.currentTarget.value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ name, number });
    reset();
  };

  return (
    <div className={style.section}>
      <form onSubmit={handleSubmit} className={style.table}>
        <h2>Phonebook</h2>
        <label className={style.label}>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={style.label}>Number</label>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleNumberChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit" className={style.button}>
          Add contact
        </button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
