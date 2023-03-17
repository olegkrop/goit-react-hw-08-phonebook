import { useSelector } from 'react-redux';
import { useFetchContactsQuery } from 'redux/contactsSlice';
import ContactItem from '../ContactItem/ContactItem';
import style from './ContactList.module.css';

const ContactList = () => {
  const filter = useSelector(store => {
    return store.filter.value;
  });
  const { data: contacts = [] } = useFetchContactsQuery();

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
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
