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
        Alert.alert('Success', 'Update project success');
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
        Alert.alert('Success', 'Delete project success');
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        Alert.alert('Error', action.error.message);
      })
      .addCase(createProject.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload.data);
        Alert.alert('Success', 'Create project success');
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        Alert.alert('Error', action.payload.error);
      });
  },
});

export default projectSlice.reducer;
