import { Alert } from 'react-native';
import api from './api';

// TODO:
export const postSignIn = async ({username, password}) => {
  const apiBody = {
    username,
    password,
  };

  try {
    const response = await api
      .post('sign-in', apiBody)
      .then(res => res)
      // .then(data => console.log('data =', data))
      .catch(err => console.log('[error] ', err));

      if (response && response.status == 200) {
        // return api.defaults.headers.Authorization = `Bearer ${response.data}`; // token
        return response;
      } else {
        // console.log(response)
        Alert.alert('Erro no login', 'usuário ou senha incorreto, tente novamente.')
        return 
      }
  } catch (error) {
    // Alert.alert('Erro no login', 'usuário ou senha incorreto', 'tente novamente.');
    return Promise.reject(error);
  }
};
