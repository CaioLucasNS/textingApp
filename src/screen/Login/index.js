import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {postSignIn} from '../../services/signIn';

import { Container } from '../../components/Container';
import { TextInput } from '../../components/TextInput';

import colors from '../../styles/global';

export function Login({ navigation }) {
  const [user, setUser] = useState(''); // 'string'
  const [password, setPassword] = useState(''); // 'string'
  const [disabledButton, setDisabledButton] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    handleDisabledButton()
  }, [user, password]);

  const handleLogin = () => {
    try {
      // TODO: fazer o tratamento do erro caso não faça o login
      postSignIn({ username: user, password: password }).catch(e => console.error(e));
  
      navigation.navigate('Home');
    } catch {
      Alert.alert('Erro ao fazer o login, tente novamente.')
    }
  }

  const handleDisabledButton = () => (
    user !== '' && password !== ''
    ? setDisabledButton(false)
    : setDisabledButton(true)
  );

  return (
    <Container>
      <View style={styles.content}>
        <TextInput
          placeholder="User"
          onChangeText={text => setUser(text)}
          value={user}
        />
        <View style={{height: 10}} />

        <TextInput
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={hidePassword}
        />
        <View 
          style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
        >
          <Icon 
            name="eye" 
            size={20} 
            color={hidePassword ? "#8a9d93" : "#c6c6c6"} 
            onPress={() => setHidePassword(!hidePassword)}
          />
        </View>


        <View style={{height: 20}} />

        <Button
          title="Login"
          color={colors.orange}
          mode="contained"
          style={{borderRadius: 6, height: 40}}
          onPress={handleLogin}
          disabled={disabledButton}
        >
          Login
        </Button>
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
});
