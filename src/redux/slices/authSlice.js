import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
  token: '',
};

const systemSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {toggleLogin, updateUser, updateToken} = systemSlice.actions;
export default systemSlice.reducer;
