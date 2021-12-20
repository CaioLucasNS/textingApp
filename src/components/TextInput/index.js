import React from 'react';
import {TextInput as TextInputPaper} from 'react-native-paper';

import colors from '../../styles/global';
import styles from './style';

export function TextInput({
  mode = 'flat', // outlined
  placeholder,
  label,
  keyboardType = 'default',
  onChangeText,
  value,
  secureTextEntry,
  icon,
  style
}) {
  if (!label) label = placeholder;

  return (
    <TextInputPaper
      style={[styles.textInput, style]}
      activeUnderlineColor={ colors.containerSecondary }
      mode={mode}
      placeholder={placeholder}
      label={label}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry} // bool
      icon={icon}
    />
  );
}
