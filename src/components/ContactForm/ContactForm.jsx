import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import CircularProgress from '@mui/material/CircularProgress';

import {
  useCreateContactMutation,
  useFetchContactsQuery,
} from 'redux/contactsSlice';
import { Button } from '@mui/material';

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
      toast.info(`${data.name} is already in contacts`);
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
    <div className={style.container}>
      <h1 className={style.title}>Create new contact</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <label className={style.label}>
          <span className={style.text}>Name</span>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name Surtname"
            onChange={handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            className={style.input}
          />
        </label>
        <label className={style.label}>
          <span className={style.text}>Number</span>
          <input
            type="tel"
            name="number"
            value={number}
            placeholder="XXX-XX-XX"
            onChange={handleNumberChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            className={style.input}
          />
        </label>
        <Button type="submit" variant="contained">
          Add contact
        </Button>
        {isLoading && (
          <CircularProgress
            size={60}
            thickness={6}
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
