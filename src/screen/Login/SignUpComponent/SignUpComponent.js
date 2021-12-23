import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {TextInput} from '../../../components/TextInput';
import {ButtonComponent} from '../../../components/ButtonComponent';
import {Modal} from '../../../components/Modal';

import styles from './styles';

export function SignUpComponent({
  showModal, // () => setShowModalSignUp(true)
  visibleModal, // showModalSignUp
  hideModal, // () => setShowModalSignUp(false)
  valueUser, // signUpUser
  onChangeTextUser, // text => setSignUpUser(text)
  valuePass, // signUpPassword
  onChangeTextPass, // text => setSignUpPassword(text)
  disabledButtonSignUp, // disabledButtonSignUp
  secureTextEntry = true,
  handleSignUp, // handleSignUp
}) {
  return (
    <View style={styles.singUpContainer}>
      <Text>Não tem uma conta?</Text>
      <View>
        <TouchableOpacity onPress={showModal}>
          <Text style={styles.text}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={visibleModal} onDismiss={hideModal}>
        <TextInput
          placeholder="Nome de usuário"
          onChangeText={onChangeTextUser}
          value={valueUser}
          style={{marginBottom: 10}}
        />

        <TextInput
          placeholder="Senha"
          onChangeText={onChangeTextPass}
          value={valuePass}
          style={{marginBottom: 10}}
          secureTextEntry={secureTextEntry}
        />

        <ButtonComponent
          onPress={handleSignUp}
          labelStyle={{color: disabledButtonSignUp ? null : '#fff'}}
          disabled={disabledButtonSignUp}>
          Cadastrar
        </ButtonComponent>
      </Modal>
    </View>
  );
}
