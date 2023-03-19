import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DotLoader } from 'react-spinners';
import { setUserAuth } from 'redux/authSlice';
import { useLoginMutation } from 'redux/userSlice';
import { Button } from '@mui/material';

import style from './LoginPage.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleEmailChange = event => {
    setMail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result.data) {
      const { token, user } = result.data;
      dispatch(
        setUserAuth({
          token,
          user,
        })
      );
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1 className={style.title}>LOGIN</h1>
        <label className={style.label}>
          <p className={style.text}>Email</p>
          <input
            type="email"
            name="email"
            placeholder="email@email.com"
            value={email}
            onChange={handleEmailChange}
            className={style.input}
            required
          />
        </label>

        <label className={style.label}>
          <p className={style.text}>Password</p>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            className={style.input}
            required
          />
        </label>
        <Button type="submit" className={style.btn} variant="contained">
          {isLoginLoading ? <DotLoader size={20} color="white" /> : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
