import axios from '@axios';

const handleLoginApi = async ({email, password}) => {
  return axios.post('/api/v1/auth/login', {
    email,
    password,
  });
};
const handleRegisterApi = async ({name, email, password}) => {
  return axios.post('/api/v1/auth/register', {
    name,
    email,
    password,
  });
};
const handleGetPersonalInfoApi = async token => {
  return axios.get('/api/v1/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {handleLoginApi, handleRegisterApi, handleGetPersonalInfoApi};
