import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,

  reducers: {
    changeFilter(state, action) {
      state.value = action.payload;
    },
    clearFilter() {
      return initialState;
    },
  },
});

export const { changeFilter, clearFilter } = filterSlice.actions;
