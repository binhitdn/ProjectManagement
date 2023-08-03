import {createSlice} from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {show: false, message: ''},
  reducers: {
    showToast: (state, action) => {
      state.show = true;
      state.message = action.payload;
    },
    hideToast: state => {
      state.show = false;
    },
  },
});

export const {showToast, hideToast} = toastSlice.actions;

export default toastSlice.reducer;
