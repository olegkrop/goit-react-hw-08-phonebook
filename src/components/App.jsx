import { useFetchContactsQuery } from 'redux/contactsSlice';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import CircularProgress from '@mui/material/CircularProgress';

const containerStyles = {
  display: 'block',
  margin: '0 auto',
  width: '400px',
};

const App = () => {
  const { data: contacts = [], isLoading } = useFetchContactsQuery();

  return (
    <div style={containerStyles}>
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
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
      {!isLoading && !contacts.length && 'No contacts'}
      {!isLoading && !!contacts.length && (
        <>
          <Filter />
          <ContactList />
        </>
      )}
    </div>
  );
};

export default App;
