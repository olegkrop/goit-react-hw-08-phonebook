import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authSelectors } from 'redux/authSlice';

const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
