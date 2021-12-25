import {Alert} from 'react-native';
import api from './api';

export const postReaction = async ({token, feedId, like, love}) => {
  const url = 'feed';
  const apiBody = {
    feedId: feedId,
    like: like, // bool
    love: love, //bool
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
      Alert.alert('Erro ao reagir à mensagem!', 'Tente novamente.');
      return;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
