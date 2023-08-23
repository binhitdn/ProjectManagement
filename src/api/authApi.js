import axios from '@axios';

const handleLoginApi = ({email, password}) => {
  return axios.post('/api/v1/auth/login', {
    email,
    password,
  });
};
const handleRegisterApi = ({name, email, password}) => {
  return axios.post('/api/v1/auth/register', {
    name,
    email,
    password,
  });
};
const handleGetPersonalInfoApi = token => {
  return axios.get('/api/v1/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {handleLoginApi, handleRegisterApi, handleGetPersonalInfoApi};
