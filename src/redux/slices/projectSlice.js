import {
  createProjectApi,
  deleteProjectApi,
  getProjectsApi,
  updateProjectApi,
} from '@api/projectApi';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async (arg, {getState}) => {
    const token = getState().auth.token;
    const response = await getProjectsApi(token);
    return response.data.data;
  },
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async (project, {getState}) => {
    const token = getState().auth.token;
    console.log(project);
    const response = await updateProjectApi(project._id, project, token);
    return response.data;
  },
);

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (projectId, {getState}) => {
    const token = getState().auth.token;
    const response = await deleteProjectApi(projectId, token);
    return {
      projectId,
      data: response.data,
    };
  },
);

export const createProject = createAsyncThunk(
  'project/createProject',
  async (project, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token;
      const response = await createProjectApi(project, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

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
