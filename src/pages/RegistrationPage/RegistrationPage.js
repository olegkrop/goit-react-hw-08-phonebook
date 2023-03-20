import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

import { toast } from 'react-toastify';
import { setUserAuth } from 'redux/authSlice';
import { useRegisterMutation } from 'redux/userSlice';
import { Button } from '@mui/material';

import style from './RegistrationPage.module.css';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [userRegister, { isLoading: isRegisterLoading }] =
    useRegisterMutation();

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEmailChange = event => {
    setMail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value);
  };

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.warning('All fields are required');
      return false;
    }
    if (password !== confirmPassword) {
      toast.warning('Password dones not match');
      return false;
    }
    return true;
  };

  const onFormSubmit = async event => {
    event.preventDefault();
    const isValidated = validateForm();
    if (!isValidated) {
      return;
    }
    const result = await userRegister({ name, email, password }).unwrap();
    const { user, token } = result || {};
    console.log(result);
    dispatch(setUserAuth({ user, token }));
  };

  return (
    <div className={style.container}>
      <form onSubmit={onFormSubmit} className={style.form}>
        <h1 className={style.title}>REGISTRATION</h1>
        <label className={style.lable}>
          <p className={style.text}>Name</p>
          <input
            type="name"
            name="name"
            placeholder="Name Surname"
            value={name}
            onChange={handleNameChange}
            required
            className={style.input}
          />
        </label>
        <label className={style.lable}>
          <p className={style.text}>Email</p>
          <input
            type="email"
            name="email"
            placeholder="email@email.com"
            value={email}
            onChange={handleEmailChange}
            required
            className={style.input}
          />
        </label>
        <label className={style.lable}>
          <p className={style.text}>Password</p>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className={style.input}
          />
        </label>
        <label className={style.lable}>
          <p className={style.text}>Confirm password</p>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className={style.input}
          />
        </label>
        <Button type="submit" className={style.btn} variant="contained">
          Submit
        </Button>
        {isRegisterLoading && (
          <CircularProgress
            size={60}
            thickness={6}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </form>
      <div className={style.registratin__link}>
        <span></span>
      </div>
    </div>
  );
};

export { RegistrationPage };
