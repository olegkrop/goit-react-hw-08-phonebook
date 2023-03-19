import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from './constants';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['Users'],
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
      providesTags: ['Users'],
    }),

    register: builder.mutation({
      query: credentials => ({
        url: '/users/signup',
        method: 'POST',
        body: credentials,
      }),
      providesTags: ['Users'],
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      providesTags: ['Users'],
    }),

    getUser: builder.query({
      query: () => ({
        url: '/users/current',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserQuery,
} = usersApi;
