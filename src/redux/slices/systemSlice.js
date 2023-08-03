import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
  loading: false,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleLoading: state => {
      state.loading = !state.loading;
    },
  },
});

export const {toggleDarkMode} = systemSlice.actions;
export default systemSlice.reducer;
