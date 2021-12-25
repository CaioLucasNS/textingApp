import api from './api';

// TODO:
export const getFeeds = async ({token}) => {
  const url = 'feeds';
  const response = await api
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res)
    .catch(err => console.error('[error] ', err));

  return response.data;
};
