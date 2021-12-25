import {Alert} from 'react-native';
import api from './api';

export const postFeed = async ({token, content}) => {
  const url = 'feed';
  const apiBody = {
    content: content,
  };

  try {
    const response = await api
      .post(url, apiBody, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => res)
      .catch(err => console.error('[error] ', err));

    if (response) {
      return response;
    } else {
      Alert.alert('Erro publicar mensagem!', 'Tente novamente.');
      return;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
