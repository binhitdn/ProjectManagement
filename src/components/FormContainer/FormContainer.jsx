import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
const FormContainer = ({children, style}) => {
  return (
    <KeyboardAvoidingView
      enabled
      style={style}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default FormContainer;
