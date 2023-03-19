import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from 'redux/authSlice';
import { contactsApi } from 'redux/contactsSlice';
import { filterSlice } from 'redux/filterSlice';
import { usersApi } from 'redux/userSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import { rtkQueryErrorLogger } from 'redux/errorMiddleware';

const rootReducer = combineReducers({
  [contactsApi.reducerPath]: contactsApi.reducer,
  [filterSlice.name]: filterSlice.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [authSlice.name]: authSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [createFilter('auth', ['token'])],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactsApi.middleware, usersApi.middleware, rtkQueryErrorLogger),
});

export const persistor = persistStore(store);
