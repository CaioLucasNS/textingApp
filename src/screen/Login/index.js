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
import style from '../../components/TextInput/style';
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
      handleGoBackToLogin()
    }
  }, [showModalForgotPassword]);

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

  const handleForgotPassword = async () => {
    try {
      await getForgotPassword({username: user})
        // .then(res => JSON.stringify(res))
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
    setUserRegistration(null);
    setUser('');
  }

  return (
    <Container>
      <View style={styles.content}>
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

        <View style={{height: 10}} />

        {/* Esqueceu a senha */}
        <>
          <View>
            <TouchableOpacity onPress={() => setShowModalForgotPassword(true)}>
              <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>
          {showModalForgotPassword && (
            <Modal
              visible={showModalForgotPassword}
              onDismiss={() => setShowModalForgotPassword(false)}>
              <TextInput
                placeholder="Usuário"
                onChangeText={text => setUser(text)}
                value={user}
                style={{marginBottom: 10}}
              />
              <ButtonComponent onPress={handleForgotPassword}>
                Ver senha
              </ButtonComponent>

              <View style={{alignItems: 'center', marginVertical: 10}}>
                {!!userRegistration && (
                  <>
                    <Text style={styles.text}>Sua senha é:</Text>
                    <Text
                      style={styles.passwordStyle}>
                      {userRegistration.password}
                    </Text>
                  </>
                )}
              </View>

              <ButtonComponent 
                onPress={handleGoBackToLogin}
                style={{ marginVertical: 5 }}
              >
                Voltar para login
              </ButtonComponent>
              {/* <ButtonComponent>teste</ButtonComponent>
              <ButtonComponent>teste</ButtonComponent>
              <ButtonComponent>teste</ButtonComponent>
              <ButtonComponent>teste</ButtonComponent> */}
            </Modal>
          )}
        </>

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
        {/* {visibleModal && (
          <Modal
            visible={visibleModal}
            onDismiss={() => setVisibleModal(false)}>
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
        )} */}
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
  forgotPassword: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.orange,
  },
  text: {
    fontSize: 20,
  },
  passwordStyle: {
    fontSize: 20,
    backgroundColor: colors.containerTertiary,
    color: colors.yellow,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 10,
  }
});
