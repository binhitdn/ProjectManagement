import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  handleGetPersonalInfoApi,
  handleLoginApi,
  handleRegisterApi,
} from '@api/authApi';

export const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async (token, {getState}) => {
    const response = await handleGetPersonalInfoApi(token);
    return response.data.data;
  },
);
export const login = createAsyncThunk('auth/login', async data => {
  const response = await handleLoginApi(data);
  return response.data;
});
export const register = createAsyncThunk('auth/register', async data => {
  const response = await handleRegisterApi(data);
  return response.data;
});
