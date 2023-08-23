import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

const FormContainer = ({children, style}) => {
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        ...style,
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
      }}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default FormContainer;
