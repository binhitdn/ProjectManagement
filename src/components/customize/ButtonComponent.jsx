import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '@constants/styles';

const ButtonComponent = ({style, color, ...props}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, color && {backgroundColor: color}, style]}
      {...props}>
      <Text style={styles.buttonText}>
        {props.title ? props.title : 'Button'}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.BUTTON,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    width: '100%',
    paddingVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
