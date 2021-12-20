import React from 'react';
import {StyleSheet} from 'react-native';
import {Modal as ModalPaper, Portal, Provider} from 'react-native-paper';

const Modal = ({children, visible = false, onDismiss, style}) => {
  return (
    <Provider>
      <Portal>
        <ModalPaper
          visible={visible}
          onDismiss={onDismiss}
          contentContainerStyle={{...styles.modal, ...style}}>
          {children}
        </ModalPaper>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 4,
    marginHorizontal: 20,
  },
});

export default Modal;
