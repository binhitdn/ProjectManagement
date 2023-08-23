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
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (arg, {getState}) => {
    const token = getState().auth.token;
    const response = await handleGetUsersApi(token);
    return response.data.data;
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, {getState}) => {
    const token = getState().auth.token;
    const response = await handleUpdateUserApi(user._id, user, token);
    return response.data;
  },
);

export const deleteUser = createAsyncThunk(
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
export const createUser = createAsyncThunk(
  'user/createUser',
  async (user, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token;
      const response = await handleCreateUserApi(user, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
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
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        Alert.alert('ユーザー情報の取得に失敗しました。');
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
        Alert.alert('ユーザー情報を更新しました。');
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        Alert.alert('ユーザー情報の更新に失敗しました。');
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
        Alert.alert('ユーザー情報を削除しました。');
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        Alert.alert('ユーザー情報の削除に失敗しました。');
      })
      .addCase(createUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.push(action.payload.data);
        Alert.alert('ユーザー情報を作成しました。');
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        Alert.alert('ユーザー情報の作成に失敗しました。');
      });
  },
});

export default userSlice.reducer;
