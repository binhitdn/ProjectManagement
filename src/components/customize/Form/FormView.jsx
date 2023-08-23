import {StyleSheet, View} from 'react-native';
import React from 'react';

const FormView = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default FormView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});
