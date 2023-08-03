import {handleGetPersonalInfoApi} from '@api/authApi';

const getPersonalInfo = async token => {
  try {
    const response = await handleGetPersonalInfoApi(token);
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    throw error;
  }
};
export default getPersonalInfo;
