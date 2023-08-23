import axios from '@axios';

const getProjectDetailApi = (projectId, token) => {
  return axios.get(`/api/v1/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const getProjectsApi = token => {
  return axios.get('/api/v1/projects', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const deleteProjectApi = (projectId, token) => {
  return axios.delete(`/api/v1/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const createProjectApi = (project, token) => {
  return axios.post('/api/v1/projects', project, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const updateProjectApi = (projectId, project, token) => {
  return axios.put(`/api/v1/projects/${projectId}`, project, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export {
  getProjectDetailApi,
  getProjectsApi,
  deleteProjectApi,
  createProjectApi,
  updateProjectApi,
};
