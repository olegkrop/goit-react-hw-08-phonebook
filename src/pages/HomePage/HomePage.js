import style from './HomePage.module.css';
import { addContact, deleteContact, filterContacts } from 'images';

const HomePage = () => {
  return (
    <div className={style.container}>
      <ul className={style.list}>
        <li className={style.item}>
          <div className={style.info}>
            <h1 className={style.title}>Welcome to Phonebook</h1>
            <h2 className={style.title}>with very basic features:</h2>
            <h2 className={style.title}> </h2>
          </div>
        </li>
        <li className={style.item}>
          <div className={style.image}>
            <img src={addContact} alt="create contact" className={style.img} />
          </div>
          <div className={style.info}>
            <h2 className={style.title}>Create contacts</h2>
          </div>
        </li>
        <li className={style.item}>
          <div className={style.info}>
            <h2 className={style.title}>Find contacts</h2>
          </div>
          <div className={style.image}>
            <img
              src={filterContacts}
              alt="filter contact"
              className={style.img}
            />
          </div>
        </li>
        <li className={style.item}>
          <div className={style.image}>
            <img
              src={deleteContact}
              alt="delete contact"
              className={style.img}
            />
          </div>
          <div className={style.info}>
            <h2 className={style.title}>Delete contacts</h2>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
