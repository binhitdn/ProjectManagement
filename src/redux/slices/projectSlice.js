import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {
  fetchProjects,
  updateProject,
  deleteProject,
  createProject,
} from '@redux/actions/projectActions';

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProjects.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProject.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(
          project => project._id === action.payload.data._id,
        );
        if (index !== -1) {
          state.projects[index] = action.payload.data;
        }
        Alert.alert('成功', 'プロジェクトの更新を成功します。');
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        Alert.alert('エラー', 'プロジェクトの更新を失敗します。');
        state.error = null;
      })
      .addCase(deleteProject.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(
          project => project._id !== action.payload.projectId,
        );
        Alert.alert('成功', 'プロジェクトの削除を成功します。');
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        Alert.alert('エラー', 'プロジェクトの削除を失敗します。');
        state.error = null;
      })
      .addCase(createProject.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload.data);
        Alert.alert('成功', 'プロジェクトの作成を成功します。');
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        Alert.alert('エラー', 'プロジェクトの作成を失敗します。');
        state.error = null;
      });
  },
});

export default projectSlice.reducer;
