import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  handleCreateUserApi,
  handleDeleteUserApi,
  handleGetUsersApi,
  handleUpdateUserApi,
} from '@api/userApi';
import {Alert} from 'react-native';

const initialState = {
  user: [],
  loading: false,
  error: '',
};

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError: (state, action) => {
      state.error[action.payload] = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        Alert.alert('成功', '获取用户列表成功');
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        Alert.alert('エラー', action.error.message);
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.user.findIndex(
          user => user._id === action.payload.data._id,
        );
        if (index !== -1) {
          state.user[index] = action.payload.data;
        }
        Alert.alert('成功', '更新用户成功');
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        Alert.alert('エラー', action.error.message);
      })
      .addCase(deleteUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user.filter(
          user => user._id !== action.payload.userId,
        );
        Alert.alert('成功', '删除用户成功');
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error.deleteUser = action.error.message;
        Alert.alert('エラー', action.error.message);
      })
      .addCase(createUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user.concat(action.payload.data);
        Alert.alert('成功', '创建用户成功');
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        Alert.alert('エラー', action.error.message);
      });
  },
});

export const {resetError} = userSlice.actions;

export default userSlice.reducer;
