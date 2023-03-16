// import PropTypes from 'prop-types';
import style from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact as deleteContactAction } from '../../redux/contactsSlice';

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

// const ContactList = ({ contacts, deleteContact }) => {
//   return (
//     <ul className={style.list}>
//       {contacts.map(({ name, number, id }) => {
//         return (
//           <li key={id}>
//             <span>{name}:</span>
//             <span>{number}</span>
//             <button
//               type="button"
//               className={style.button}
//               onClick={() => deleteContact(id)}
//             >
//               Delete
//             </button>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// ContactList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//       id: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   deleteContact: PropTypes.func.isRequired,
// };
// export default ContactList;
