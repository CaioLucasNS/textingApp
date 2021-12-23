import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {getForgotPassword} from '../../services/getForgotPassword';
import {postSignIn} from '../../services/postSignIn';
import {postSignUp} from '../../services/postSignUp';

import {Container} from '../../components/Container';
import {TextInput} from '../../components/TextInput';
import {ButtonComponent} from '../../components/ButtonComponent';
import {Modal} from '../../components/Modal';

import colors from '../../styles/global';
import { ForgotPasswordComponent } from './ForgotPasswordComponent/ForgotPasswordComponent';
// import {ModalForgotPassword} from './ModalForgotPassword';

export function Login({navigation}) {
  const [user, setUser] = useState(''); // 'string'
  const [password, setPassword] = useState(''); // 'string'
  const [userRegistration, setUserRegistration] = useState(null); // {}
  const [disabledButton, setDisabledButton] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);

  const [showModalForgotPassword, setShowModalForgotPassword] = useState(false);

  useEffect(() => {
    handleDisabledButton();
  }, [user, password]);

  useEffect(() => {
    if (!showModalForgotPassword) {
      handleClearFields()
    }
  }, [showModalForgotPassword]);

  const handleSignIn = () => {
    try {
      postSignIn({username: user, password: password})
        .then(res => res?.status == 200 ? navigation.navigate('Home') : null)
        .catch(e => console.log(e));
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

  const handleForgotPassword = async () => {
    try {
      await getForgotPassword({username: user})
        .then(data => setUserRegistration(data))
    } catch (error) {
      console.error('[ERROR] ForgotPassword ', error);
      Alert.alert('Erro, tente novamente.');
    }
  };

  const handleDisabledButton = () =>
    user !== '' && password !== ''
      ? setDisabledButton(false)
      : setDisabledButton(true);


  const handleGoBackToLogin = () => {
    setShowModalForgotPassword(false);
    handleClearFields();
  };

  const handleClearFields = () => {
    setUserRegistration(null);
    setUser('');
    setPassword('');
  };

  return (
    <Container>
      <View style={styles.content}>
        {/* login */}
        <View>
          <TextInput
            placeholder="Usuário"
            onChangeText={text => setUser(text)}
            value={user}
            style={{marginBottom: 10}}
          />

          <TextInput
            placeholder="Senha"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={hidePassword}
          />

          <View style={{alignItems: 'flex-end', marginBottom: 20}}>
            <Icon
              name="eye"
              size={20}
              color={hidePassword ? colors.containerPrimary : colors.yellow}
              onPress={() => setHidePassword(!hidePassword)}
            />
          </View>

          <ButtonComponent
            labelStyle={{color: disabledButton ? null : '#fff'}}
            onPress={handleSignIn}
            disabled={disabledButton}>
            Entrar
          </ButtonComponent>
        </View>
        <View style={{height: 10}} />

        {/* Esqueceu a senha */}
        <ForgotPasswordComponent 
          visibleModal={showModalForgotPassword}
          showModal={() => setShowModalForgotPassword(true)}
          hideModal={() => setShowModalForgotPassword(false)}
          value={user}
          onChangeText={text => setUser(text)}
          userRegistration={userRegistration}
          goBackLogin={handleGoBackToLogin}
          handleForgotPassword={handleForgotPassword}
        />

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
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
  // text: {
  //   fontSize: 20,
  // },
});
