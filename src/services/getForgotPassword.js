import api from './api';

export const getForgotPassword = async ({username}) => {
  try {
    await api
      .get(`forgot-password/${username}`)
      .then(res => JSON.stringify(res.data))
      .then(data => console.log('senha =', data))
      .catch(err => console.error('[error] ', err));
  } catch (error) {
    console.error('[ERROR] ', error);
    return Promise.reject(error);
  }
};
