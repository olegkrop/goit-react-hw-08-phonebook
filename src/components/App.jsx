import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import style from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
    id: '',
  };

  handleAddContact = data => {
    const existingContactsNames = this.state.contacts.map(({ name }) =>
      name.toLowerCase()
    );
    if (existingContactsNames.includes(data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    const contact = {
      name: data.name,
      number: data.number,
      id: nanoid(),
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = deleteId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== deleteId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const visibleContacts = this.getVisibleContacts();
    const containerStyles = {
      display: 'block',
      margin: '0 auto',
      width: '400px',
    };

    const contactsLength = this.state.contacts.length;

    return (
      <div style={containerStyles}>
        <ContactForm onSubmit={this.handleAddContact} />
        {contactsLength > 0 ? (
          <>
            <div className={style.section}>
              <Filter value={this.state.filter} onChange={this.changeFilter} />
              <ContactList
                contacts={visibleContacts}
                deleteContact={this.deleteContact}
              />
            </div>
          </>
        ) : (
          <>
            <Filter value={this.state.filter} onChange={this.changeFilter} />
            <p className={style.label}>No contacts</p>
          </>
        )}
      </div>
    );
  }
}

export default App;
