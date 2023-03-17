import { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  useCreateContactMutation,
  useFetchContactsQuery,
} from 'redux/contactsSlice';
import CircularProgress from '@mui/material/CircularProgress';
import style from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [createContact, { isLoading }] = useCreateContactMutation();
  const { data: contacts = [] } = useFetchContactsQuery();

  const onSubmit = data => {
    const existingContactsNames = contacts.map(({ name }) =>
      name.toLowerCase()
    );
    if (existingContactsNames.includes(data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    const contact = {
      name: data.name,
      number: data.number,
      id: nanoid(),
    };

    createContact(contact);
  };

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
        <span className={style.label}>Name</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <span className={style.label}>Number</span>
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
        {isLoading && (
          <CircularProgress
            size={58}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </form>
    </div>
  );
};

export default ContactForm;
