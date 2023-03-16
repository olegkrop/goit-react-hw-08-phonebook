import { useSelector, useDispatch } from 'react-redux';
import { deleteContact as deleteContactAction } from '../../redux/contactsSlice';
import style from './ContactList.module.css';

const ContactList = () => {
  const { items: contacts, filter } = useSelector(store => {
    return store.contacts;
  });

  const dispatch = useDispatch();

  const deleteContact = deleteId => {
    dispatch(deleteContactAction(deleteId));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <ul className={style.list}>
      {visibleContacts.map(({ name, number, id }) => {
        return (
          <li key={id} className={style.contacts__item}>
            <span className={style.name}>{name}:</span>
            <span className={style.number}>{number}</span>
            <button
              type="button"
              className={style.button}
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
