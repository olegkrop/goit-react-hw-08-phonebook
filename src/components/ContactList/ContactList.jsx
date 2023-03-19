import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFetchContactsQuery } from 'redux/contactsSlice';
import ContactItem from '../../components/ContactItem/ContactItem';
import { getRandomColor } from 'utilities';

import style from './ContactList.module.css';

const ContactList = () => {
  const filter = useSelector(store => {
    return store.filter.value;
  });
  const { data: contacts = [] } = useFetchContactsQuery();
  const coloredContacts = useMemo(() => {
    return contacts.map(contact => {
      return { ...contact, color: getRandomColor() };
    });
  }, [contacts]);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return coloredContacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <ul className={style.list}>
      {visibleContacts.map(contact => {
        return (
          <li key={contact.id} className={style.item}>
            <ContactItem contact={contact} />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
