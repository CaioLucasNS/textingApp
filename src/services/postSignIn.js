import { Alert } from 'react-native';
import api from './api';

export const postSignIn = async ({username, password}) => {
  const url = 'sign-in';
  const apiBody = {
    username,
    password,
  };

  try {
    const response = await api
      .post(url, apiBody)
      .then(res => res)
      .catch(err => console.log('[error] ', err));

      if (response && response.status == 200) {
        // return api.defaults.headers.Authorization = `Bearer ${response.data}`; // token
        return response;
      } else {
        Alert.alert('Erro no login', 'usuário ou senha incorreto, tente novamente.');
        return 
      }
  } catch (error) {
    Alert.alert('Erro no login', 'usuário ou senha incorreto, tente novamente.');
    return Promise.reject(error);
  }
};
