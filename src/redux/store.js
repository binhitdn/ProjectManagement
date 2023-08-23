import {configureStore} from '@reduxjs/toolkit';
import systemReducer from '@redux/slices/systemSlice';
import toastReducer from '@redux/slices/toastSlice';
import authReducer from '@redux/slices/authSlice';
import userReducer from '@redux/slices/userSlice';
import projectReducer from '@redux/slices/projectSlice';
const store = configureStore({
  reducer: {
    system: systemReducer,
    toast: toastReducer,
    auth: authReducer,
    users: userReducer,
    projects: projectReducer,
  },
});

export default store;
