import { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { ToastContainer } from 'react-toastify';
import { DotLoader } from 'react-spinners';
import { ContactsPage, HomePage, LoginPage, RegistrationPage } from 'pages';
import { AppBar, PrivateRoute, PublicRoute } from 'components';
import { useGetUserQuery } from 'redux/userSlice';
import { authSelectors, setUserAuth } from 'redux/authSlice';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  width: '100%',
  minHeight: '100vh',
  background: 'transparent',
};

const App = () => {
  const token = useSelector(authSelectors.getToken);
  const { data: user, isLoading } = useGetUserQuery(token || skipToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUserAuth({ user }));
    }
  }, [dispatch, user]);

  return (
    <div style={style}>
      {isLoading ? (
        <DotLoader />
      ) : (
        <>
          <BrowserRouter basename="/goit-react-hw-08-phonebook">
            <Suspense fallback={<p>Loading...</p>}>
              <AppBar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <PublicRoute>
                      <HomePage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute restricted redirectTo="/contacts">
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/registration"
                  element={
                    <PublicRoute restricted redirectTo="/contacts">
                      <RegistrationPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/contacts"
                  element={
                    <PrivateRoute restricted redirectTo="/login">
                      <ContactsPage />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/contacts" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default App;
