import {createSlice} from '@reduxjs/toolkit';

import {Alert} from 'react-native';
import {
  fetchUsers,
  updateUser,
  deleteUser,
  createUser,
} from '@redux/actions/userActions';

const initialState = {
  user: [],
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,

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
        Alert.alert('エラー', 'ユーザーの更新を失敗します。');
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
        Alert.alert('エラー', 'ユーズの削除を失敗します。');
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
        Alert.alert('エラー', 'ユーズの作成を失敗します。');
        // Reset the error state to null after error is handled
        state.error = null;
      });
  },
});

export const {resetError} = userSlice.actions;
export {fetchUsers, updateUser, deleteUser, createUser};
export default userSlice.reducer;
