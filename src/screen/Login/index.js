import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {postSignIn} from '../../services/signIn';

import {Container} from '../../components/Container';
import {TextInput} from '../../components/TextInput';

import colors from '../../styles/global';
import {postSignUp} from '../../services/signUp';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from '../../components/Modal';

export function Login({navigation}) {
  const [user, setUser] = useState(''); // 'string'
  const [password, setPassword] = useState(''); // 'string'
  const [disabledButton, setDisabledButton] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    handleDisabledButton();
  }, [user, password]);

  const handleSignIn = () => {
    try {
      // TODO: fazer o tratamento do erro caso não faça o login
      postSignIn({username: user, password: password})
        .then(res => console.log(res))
        .catch(e => console.error(e));
      navigation.navigate('Home');
    } catch (error) {
      console.error('[ERROR] SignIn ', error);
      Alert.alert('Erro ao fazer o login, tente novamente.');
    }
  };

  const handleSignUp = () => {
    try {
      postSignUp({username: user, password: password})
        .then(res => console.log(res))
        .catch(e => console.error(e));
      // TODO: navegar de volta para login
      // navigation.navigate('Home');
    } catch (error) {
      console.error('[ERROR] SignUp ', error);
      Alert.alert('Erro ao fazer o login, tente novamente.');
    }
  };

  const handleDisabledButton = () =>
    user !== '' && password !== ''
      ? setDisabledButton(false)
      : setDisabledButton(true);

  return (
    <Container>
      <View style={styles.content}>
        <TextInput
          placeholder="Usuário"
          onChangeText={text => setUser(text)}
          value={user}
        />
        <View style={{height: 10}} />

        <TextInput
          placeholder="Senha"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={hidePassword}
        />
        <View style={{alignItems: 'flex-end'}}>
          <Icon
            name="eye"
            size={20}
            color={hidePassword ? '#8a9d93' : '#c6c6c6'}
            onPress={() => setHidePassword(!hidePassword)}
          />
        </View>

        <View style={{height: 20}} />

        <Button
          color={colors.orange}
          mode="contained"
          style={{borderRadius: 6, height: 40}}
          onPress={handleSignIn}
          disabled={disabledButton}>
          Entrar
        </Button>

        <View style={{height: 10}} />

        <TouchableOpacity onPress={handleSignUp}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              color: colors.orange,
            }}>
            Esqueceu a senha?
          </Text>
        </TouchableOpacity>

        <View style={styles.singUpContainer}>
          <Text>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => setVisibleModal(true)}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.orange,
              }}>
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>

        <Modal 
          visible={visibleModal}
          onDismiss={() => setVisibleModal(false)}
        >
          <TextInput
            placeholder="Usuário"
            onChangeText={text => setUser(text)}
            value={user}
          />
          <View style={{height: 10}} />

          <TextInput
            placeholder="Senha"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={hidePassword}
          />
        </Modal>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: colors.containerSecondary,
    padding: 40,
    height: '80%',
    borderRadius: 6,
    justifyContent: 'center',
  },
  singUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    top: 20,
    borderTopWidth: 2,
    borderColor: colors.containerPrimary,
    padding: 10,
  },
});
