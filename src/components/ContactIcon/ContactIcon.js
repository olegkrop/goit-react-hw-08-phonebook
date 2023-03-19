import { getRandomColor } from 'utilities';
import PropTypes from 'prop-types';

import style from './ContactIcon.module.css';

const ContactIcon = ({ name, isRandomColor, selectedColor = 'blue' }) => {
  const firstLetterOfName = name.slice(0, 1).toUpperCase();

  return (
    <div
      style={{
        backgroundColor: isRandomColor ? getRandomColor() : selectedColor,
      }}
      className={style.icon}
    >
      {firstLetterOfName}
    </div>
  );
};

ContactIcon.propTypes = {
  name: PropTypes.string.isRequired,
  isRandomColor: PropTypes.bool,
  selectedColor: PropTypes.string,
};

export default ContactIcon;
