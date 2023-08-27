import {
  handleCreateUserApi,
  handleDeleteUserApi,
  handleGetUsersApi,
  handleUpdateUserApi,
} from '@api/userApi';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token;
      const response = await handleGetUsersApi(token);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token;
      const response = await handleUpdateUserApi(user._id, user, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token;
      const response = await handleDeleteUserApi(userId, token);
      return {
        userId,
        data: response.data,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (user, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token;
      const response = await handleCreateUserApi(user, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
