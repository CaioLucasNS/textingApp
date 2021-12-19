import axios from 'axios';

const api = axios.create({
  baseURL: 'https://segware-book-api.segware.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
