import React from 'react';
import {StyleSheet} from 'react-native';
import {Modal as ModalPaper, Portal} from 'react-native-paper';
import colors from '../../styles/global';

export const Modal = ({children, visible = false, onDismiss, style}) => {
  return (
      <Portal>
        <ModalPaper
          visible={visible}
          onDismiss={onDismiss}
          contentContainerStyle={{...styles.modal, ...style}}>
          {children}
        </ModalPaper>
      </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    // width: '90%',
    backgroundColor: colors.containerSecondary,
    padding: 20,
    borderRadius: 4,
    marginHorizontal: 20,
  },
});
