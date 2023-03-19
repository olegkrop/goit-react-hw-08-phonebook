import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import MoonLoader from 'react-spinners/MoonLoader';
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
    <div className={style._container}>
      <h1 className={style.addContact__title}>Create new contact</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <label className={style._label}>
          <span className={style._text}>Name</span>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name Surtname"
            onChange={handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            className={style._input}
          />
        </label>
        <label className={style._label}>
          <span className={style._text}>Number</span>
          <input
            type="tel"
            name="number"
            value={number}
            placeholder="XXX-XX-XX"
            onChange={handleNumberChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            className={style._input}
          />
        </label>
        <Button
          type="submit"
          // className={style.contactsAdd__btn}
          variant="contained"
        >
          Add contact
        </Button>
        {isLoading && <MoonLoader size={8} />}
      </form>
    </div>
  );
};

export default ContactForm;
