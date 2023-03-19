import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, unsetUserAuth } from 'redux/authSlice';
import { contactsApi } from 'redux/contactsSlice';
import { clearFilter } from 'redux/filterSlice';
import { useLogoutMutation } from 'redux/userSlice';
import { Button } from '@mui/material';

import style from './UserMenu.module.css';

const UserMenu = () => {
  const [logOut] = useLogoutMutation();
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);

  const onLogOutClick = async () => {
    await logOut();
    dispatch(unsetUserAuth());
    dispatch(contactsApi.util.resetApiState());
    dispatch(clearFilter());
    return;
  };

  return (
    <div className={style.wrap}>
      <div className={style.name__wrap}>
        <p className={style.text}> Hello, {user.name}!</p>
      </div>
      <Button type="button" onClick={onLogOutClick} variant="contained">
        Log out
      </Button>
    </div>
  );
};

export default UserMenu;
