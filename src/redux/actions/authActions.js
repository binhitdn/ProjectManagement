import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  handleGetPersonalInfoApi,
  handleLoginApi,
  handleRegisterApi,
} from '@api/authApi';

const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async (token, {getState}) => {
    try {
      const response = await handleGetPersonalInfoApi(token);
      return response.data.data;
    } catch (err) {
      return err.message;
    }
  },
);
const login = createAsyncThunk('auth/login', async data => {
  const response = await handleLoginApi(data);
  return response.data;
});
const register = createAsyncThunk('auth/register', async data => {
  const response = await handleRegisterApi(data);
  return response.data;
});

export {fetchUserInfo, login, register};
