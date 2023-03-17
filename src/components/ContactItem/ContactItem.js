import { useDeleteContactMutation } from 'redux/contactsSlice';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import style from '../ContactList/ContactList.module.css';

const ContactItem = ({ contact }) => {
  const { name, number, id } = contact;
  console.log(contact);
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  return (
    <>
      <span className={style.name}>{name}: </span>
      <span className={style.number}> {number} </span>
      <button
        type="button"
        className={style.delete_btn}
        onClick={() => deleteContact(id)}
      >
        Delete
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
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactItem;
