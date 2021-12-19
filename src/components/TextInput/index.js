import React from 'react';
import {TextInput as TextInputPaper} from 'react-native-paper';

import styles from './style';

export function TextInput({
  mode = 'outlined', // flat
  placeholder,
  label,
  keyboardType = 'default',
  onChangeText,
  value,
  secureTextEntry,
}) {
  if (!label) label = placeholder;

  return (
    <TextInputPaper
      style={styles.textInput}
      mode={mode}
      placeholder={placeholder}
      label={label}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry} // bool
    />
  );
}
