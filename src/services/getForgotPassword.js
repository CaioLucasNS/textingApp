import { Alert } from 'react-native';
import api from './api';

export const getForgotPassword = async ({username}) => {
  const url = `forgot-password/${username}`;

  try {
    const response = await api.get(url)
      .then(res => res)
      .catch(err => console.error('[error] ', err));

      if (response.status == 200) {
        return response.data;
      } else {
        Alert.alert('Erro ao solicitar sua senha', 'informe o nome de usuário correto!')
      }
  } catch (error) {
    console.error('[ERROR] ', error);
    return Promise.reject(error);
  }
};
