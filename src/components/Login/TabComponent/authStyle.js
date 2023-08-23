import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/styles';

export default StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },

  //LoginComponent
  loginContainer: {},
  loginText: {
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    padding: 5,
    marginLeft: 10,
  },
  iconStyle: {
    flex: 0.1,
  },
  inputsName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});
