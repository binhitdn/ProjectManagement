import {configureStore} from '@reduxjs/toolkit';
import systemReducer from '@redux/slices/systemSlice';
import toastReducer from '@redux/slices/toastSlice';
import authReducer from '@redux/slices/authSlice';
const store = configureStore({
  reducer: {
    system: systemReducer,
    toast: toastReducer,
    auth: authReducer,
  },
});

export default store;
