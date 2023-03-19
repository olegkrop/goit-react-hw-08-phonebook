import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  user: {
    email: '',
    name: '',
  },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setUserAuth(state, action) {
      state.token = action.payload.token || state.token;
      if (!state.token) {
        return;
      }
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },

    unsetUserAuth() {
      return initialState;
    },
  },
});

export const authSelectors = {
  getIsLoggedIn(store) {
    return store.auth.isLoggedIn;
  },
  getToken(store) {
    return store.auth.token;
  },
  getUser(store) {
    return store.auth.user;
  },
};

export const { setUserAuth, unsetUserAuth } = authSlice.actions;
