import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from 'redux/contactsSlice';
import { filterSlice } from 'redux/filterSlice';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    [filterSlice.name]: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
