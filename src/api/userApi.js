import axios from '@axios';

const handleGetUsersApi = token => {
  return axios.get('/api/v1/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleGetUserDetailApi = (userId, token) => {
  return axios.get(`/api/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleDeleteUserApi = (userId, token) => {
  return axios.delete(`/api/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleCreateUserApi = (user, token) => {
  return axios.post('/api/v1/users', user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleUpdateUserApi = (userId, user, token) => {
  return axios.put(`/api/v1/users/${userId}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  handleGetUsersApi,
  handleGetUserDetailApi,
  handleDeleteUserApi,
  handleCreateUserApi,
  handleUpdateUserApi,
};
