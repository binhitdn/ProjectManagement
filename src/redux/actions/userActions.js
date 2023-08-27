import {
  handleCreateUserApi,
  handleDeleteUserApi,
  handleGetUsersApi,
  handleUpdateUserApi,
} from '@api/userApi';
import {createAsyncThunk} from '@reduxjs/toolkit';

const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (arg, {getState}) => {
    const token = getState().auth.token;
    const response = await handleGetUsersApi(token);
    return response.data.data;
  },
);

const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, {getState}) => {
    const token = getState().auth.token;
    const response = await handleUpdateUserApi(user._id, user, token);
    return response.data;
  },
);

const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, {getState}) => {
    const token = getState().auth.token;
    const response = await handleDeleteUserApi(userId, token);
    return {
      userId,
      data: response.data,
    };
  },
);
const createUser = createAsyncThunk(
  'user/createUser',
  async (user, {getState}) => {
    const token = getState().auth.token;
    const response = await handleCreateUserApi(user, token);
    return response.data;
  },
);
export {fetchUsers, updateUser, deleteUser, createUser};
