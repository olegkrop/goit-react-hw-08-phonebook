import { useDeleteContactMutation } from 'redux/contactsSlice';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import PropTypes from 'prop-types';
import style from './ContactItem.module.css';

const ContactItem = ({ contact }) => {
  const { name, number, id } = contact;
  console.log(contact);
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  return (
    <>
      <div className={style.container}>
        <div className={style.name}>{name}: </div>
        <div className={style.number}> {number} </div>
        <Button
          onClick={() => deleteContact(id)}
          variant="contained"
          size="small"
          style={{
            maxHeight: '25px',
            minHeight: '25px',
            // padding: '20px 0',
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
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
      </div>
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
