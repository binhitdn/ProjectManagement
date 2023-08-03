import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/styles';

export default StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  //LoginComponent
  loginContainer: {},
  loginText: {
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
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
  buttonContainer: {
    backgroundColor: COLORS.BUTTON,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: 50,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  inputsName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});
