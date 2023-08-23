import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '@constants/styles';

const TextInputComponent = React.forwardRef(
  ({containerStyle, textInputStyle, leftIcon, rightIcon, ...props}, ref) => {
    return (
      <View style={[styles.inputContainer, containerStyle]}>
        <View>{leftIcon}</View>
        <TextInput
          style={[styles.textInput, textInputStyle]}
          {...props}
          ref={ref}
        />
        <View>{rightIcon}</View>
      </View>
    );
  },
);

export default TextInputComponent;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#292929',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
  },
  textInput: {
    flex: 1,
    color: COLORS.TEXT,
  },
  errorText: {
    color: COLORS.ERROR,
    marginLeft: 50,
    padding: 5,
  },
  iconStyle: {
    flex: 0.1,
  },
});
