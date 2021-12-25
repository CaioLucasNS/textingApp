import api from './api';
import { Alert } from 'react-native';
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
      .then(res => res)
      .catch(err => console.log('[error] ', err));

      if (response && response.status == 200) {
        return response;
      } else {
        Alert.alert('Erro ao tentar fazer cadastro!', 'Nome de usuário já existe, tente outro.');
        return 
      }
  } catch (error) {
    return Promise.reject(error);
  }
};
