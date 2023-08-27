import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {toggleLoading} = systemSlice.actions;
export default systemSlice.reducer;
