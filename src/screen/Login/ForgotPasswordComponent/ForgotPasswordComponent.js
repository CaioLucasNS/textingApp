import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Modal } from '../../../components/Modal';
import { TextInput } from '../../../components/TextInput';
import { ButtonComponent } from '../../../components/ButtonComponent';

import styles from './styles';

export function ForgotPasswordComponent({
    showModal, // () => setShowModalForgotPassword(true)
    visibleModal, // showModalForgotPassword
    hideModal, // () => setShowModalForgotPassword(false)
    value, // user
    onChangeText, // text => setUser(text)
    userRegistration, // userRegistration
    goBackLogin, // handleGoBackToLogin
    handleForgotPassword, // handleForgotPassword
}) {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={showModal}>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
      {visibleModal && (
        <Modal
          visible={visibleModal}
          onDismiss={hideModal}>
          <TextInput
            placeholder="Usuário"
            onChangeText={onChangeText}
            value={value}
            style={{marginBottom: 10}}
          />
          <ButtonComponent onPress={handleForgotPassword}>
            Ver senha
          </ButtonComponent>

          <View style={{alignItems: 'center', marginVertical: 10}}>
            {!!userRegistration && (
              <>
                <Text style={styles.text}>Sua senha é:</Text>
                <Text style={styles.passwordStyle}>
                  {userRegistration.password}
                </Text>
              </>
            )}
          </View>

          <ButtonComponent
            onPress={goBackLogin}
            style={{marginVertical: 5}}>
            Voltar para login
          </ButtonComponent>
        </Modal>
      )}
    </View>
  );
};
