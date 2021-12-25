import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {getForgotPassword} from '../../services/getForgotPassword';
import {postSignIn} from '../../services/postSignIn';
import {postSignUp} from '../../services/postSignUp';

import {Container} from '../../components/Container';
import {TextInput} from '../../components/TextInput';
import {ButtonComponent} from '../../components/ButtonComponent';

import colors from '../../styles/global';
import {ForgotPasswordComponent} from './ForgotPasswordComponent/ForgotPasswordComponent';
import { SignUpComponent } from './SignUpComponent/SignUpComponent';

export function Login({navigation}) {
  const [user, setUser] = useState(''); // 'string'
  const [password, setPassword] = useState(''); // 'string'
  const [token, setToken] = useState(null);
  const [signUpUser, setSignUpUser] = useState(''); // 'string'
  const [signUpPassword, setSignUpPassword] = useState(''); // 'string'
  const [userRegistration, setUserRegistration] = useState(null); // {}
  const [disabledButton, setDisabledButton] = useState(true);
  const [disabledButtonSignUp, setDisabledButtonSignUp] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);

  const [showModalSignUp, setShowModalSignUp] = useState(false);
  const [showModalForgotPassword, setShowModalForgotPassword] = useState(false);

  useEffect(() => {
    handleDisabledButton();
  }, [user, password]);

  useEffect(() => {
    handleDisabledButtonSignUp();
  }, [signUpUser, signUpPassword]);

  useEffect(() => {
    if (!showModalForgotPassword) {
      handleClearFields();
    }
  }, [showModalForgotPassword]);

  const handleSignIn = () => {
    try {
      postSignIn({username: user, password: password})
        .then(res => {

          if(res?.status == 200) {
            setToken(res.data);
            navigation.navigate('Home', { token: token });
          } 
          return null
        })
        .catch(e => console.log(e));
    } catch (error) {
      console.error('[ERROR] SignIn ', error);
      Alert.alert('Erro ao fazer o login, tente novamente.');
    }
  };

  const handleSignUp = () => {
    try {
      postSignUp({username: signUpUser, password: signUpPassword})
        .then(res => {
          if (res?.status == 200) {
            handleRegisteredUser();
          } 
          return null
        })
        .catch(e => console.error(e));
    } catch (error) {
      console.error('[ERROR] SignUp ', error);
      Alert.alert('Erro ao fazer o login, tente novamente.');
    }
  };

  const handleForgotPassword = async () => {
    try {
      await getForgotPassword({username: user}).then(data =>
        setUserRegistration(data),
      );
    } catch (error) {
      console.error('[ERROR] ForgotPassword ', error);
      Alert.alert('Erro, tente novamente.');
    }
  };

  const handleDisabledButton = () => {
    return user !== '' && password !== ''
      ? setDisabledButton(false)
      : setDisabledButton(true);
  };

  const handleDisabledButtonSignUp = () => {
    return signUpUser !== '' && signUpPassword !== ''
      ? setDisabledButtonSignUp(false)
      : setDisabledButtonSignUp(true);
  };

  const handleRegisteredUser = () => {
    Alert.alert('Usuário cadastrado com sucesso!', 'Faça o login na sua conta.')
    handleGoBackToLogin();
  };

  const handleGoBackToLogin = () => {
    setShowModalForgotPassword(false);
    setShowModalSignUp(false);
    handleClearFields();
  };

  const handleClearFields = () => {
    setUserRegistration(null);
    setUser('');
    setPassword('');
    setSignUpUser('');
    setSignUpPassword('');
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

        {/* cadastro */}
        <SignUpComponent
          showModal={() => setShowModalSignUp(true)}
          visibleModal={showModalSignUp}
          hideModal={() => setShowModalSignUp(false)}
          valueUser={signUpUser}
          onChangeTextUser={text => setSignUpUser(text)}
          valuePass={signUpPassword}
          onChangeTextPass={text => setSignUpPassword(text)}
          disabledButtonSignUp={disabledButtonSignUp}
          handleSignUp={handleSignUp}
        />
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
});
