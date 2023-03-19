import ContactForm from '../../components/ContactForm/ContactForm';
import Filter from '../../components/Filter/Filter';
import ContactList from '../../components/ContactList/ContactList';

import style from './ContactsPage.module.css';

const ContactsPage = () => {
  return (
    <div className={style.container}>
      <div className={style.head}>
        <div className={style.title}>Phonebook</div>
        <Filter />
      </div>
      <div className={style.body}>
        <ContactForm />
        <ContactList />
      </div>
    </div>
  );
};

export { ContactsPage };
