import api from './api';

// TODO:
export const postSignIn = async ({username, password}) => {
  const apiBody = {
    username,
    password,
  };

  try {
    await api
      .post('sign-in', apiBody)
      .then(res => JSON.stringify(res.data))
      // .then(data => console.log('data =', data))
      .catch(err => console.error('[error] ', err));
  } catch (error) {
    console.error('[ERROR] ', error);
    return Promise.reject(error);
  }
};
