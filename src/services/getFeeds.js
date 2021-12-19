import api from './api';

// TODO:
export const getFeeds = () => {
  api
    .get('feeds')
    .then(res => JSON.stringify(res.data))
    .catch(err => console.error('[error] ', err));
};
