import React from 'react';
import {Button as ButtonPaper} from 'react-native-paper';

import colors from '../../styles/global';

export function ButtonComponent({
  children,
  color,
  mode,
  style,
  labelStyle,
  onPress,
  disabled = false,
}) {
  if(!labelStyle) labelStyle = { color: '#fff' }

  return (
    <ButtonPaper
      color={color || colors.orange}
      mode={mode || 'contained'}  // outlined || text
      style={{borderRadius: 6, height: 40, ...style}}
      labelStyle={labelStyle}
      uppercase={false}
      onPress={onPress}
      disabled={disabled}>
      {children}
    </ButtonPaper>
  );
}
