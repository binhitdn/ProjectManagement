import {
  createProjectApi,
  deleteProjectApi,
  getProjectsApi,
  updateProjectApi,
} from '@api/projectApi';
import {createAsyncThunk} from '@reduxjs/toolkit';

const updateProject = createAsyncThunk(
  'project/updateProject',
  async (project, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token;
      const response = await updateProjectApi(project._id, project, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (projectId, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token;
      const response = await deleteProjectApi(projectId, token);
      return {
        projectId,
        data: response.data,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const createProject = createAsyncThunk(
  'project/createProject',
  async (project, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token;
      const response = await createProjectApi(project, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async (arg, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token;
      const response = await getProjectsApi(token);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export {fetchProjects, updateProject, deleteProject, createProject};
