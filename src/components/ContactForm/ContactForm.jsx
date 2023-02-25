import { Component } from 'react';
import PropTypes from 'prop-types';
import { InputField } from '../InputField/InputField';
import style from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;
    const { onSubmit } = this.props;

    return (
      <form
        className={style.contactFormTable}
        onSubmit={event => onSubmit({ event, name, number })}
      >
        <InputField
          label="name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я
                ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters,
                apostrophe, dash and spaces. For example Adrian, Jacob Mercer,
                Charles de Batz de Castelmore d'Artagnan"
          required={true}
          onChange={this.handleChange}
        />
        <InputField
          label="number"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required={true}
          onChange={this.handleChange}
        />
        <button type="submit" className={style.contactFormButton}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
