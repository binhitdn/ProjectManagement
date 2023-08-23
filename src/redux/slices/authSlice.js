import {
  handleGetPersonalInfoApi,
  handleLoginApi,
  handleRegisterApi,
} from '@api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const initialState = {
  user: {},
  token: '',
  loading: false,
  error: null,
};
const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async (token, {getState}) => {
    const response = await handleGetPersonalInfoApi(token);
    return response.data.data;
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
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        AsyncStorage.setItem('token', action.payload.token);
        Alert.alert('Success', 'Login success');
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        Alert.alert('Error', action.error.message);
      })
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        AsyncStorage.setItem('token', action.payload.token);
        Alert.alert('Success', 'Register success');
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        Alert.alert('Error', action.error.message);
      });
  },
});

export const {toggleLogin, updateUser, updateToken} = systemSlice.actions;
export {fetchUserInfo, login, register};
export default systemSlice.reducer;
