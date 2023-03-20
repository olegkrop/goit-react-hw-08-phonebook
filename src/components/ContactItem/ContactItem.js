import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import ContactIcon from '../ContactIcon/ContactIcon';
import { useDeleteContactMutation } from 'redux/contactsSlice';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import style from './ContactItem.module.css';

const ContactItem = ({ contact }) => {
  const { name, number, id, color } = contact;
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <div className={style.wrap}>
      <span className={style.icon}>
        <ContactIcon name={name} isRandomColor={!color} selectedColor={color} />
      </span>
      <div className={style.info}>
        <span className={style.name}>{name}</span>
        <span className={style.number}>{number}</span>
      </div>
      <IconButton
        aria-label="delete"
        type="button"
        onClick={() => deleteContact(id)}
      >
        <DeleteIcon />
      </IconButton>
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
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
};

export default ContactItem;
