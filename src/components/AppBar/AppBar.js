import { useSelector } from 'react-redux';
import UserMenu from '../UserMenu/UserMenu';
import Nav from '../Nav/Nav';
import { authSelectors } from 'redux/authSlice';

const styles = { position: 'fixed', width: '100%', zIndex: '100' };

const AppBar = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return <header style={styles}>{isLoggedIn ? <UserMenu /> : <Nav />}</header>;
};

export default AppBar;
