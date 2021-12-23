import api from './api';

// TODO:
export const postSignUp = async ({username, password}) => {
  const url = 'sign-up';
  const apiBody = {
    username,
    password,
  };

  try {
    const response = await api
      .post(url, apiBody)
      .then(res => JSON.stringify(res.data))
      .then(data => console.log('data =', data))
      .catch(err => console.error('[error] ', err));

    return response;
  } catch (error) {
    console.error('[ERROR] ', error);
    return Promise.reject(error);
  }
};
