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
  forgotPassword: {
    alignItems: 'flex-end',
    padding: 10,
  },
  forgotPasswordText: {
    color: COLORS.TEXT,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.MODAL_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalView: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    margin: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: COLORS.SHADOW,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  modalHeaderText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.TEXT,
  },
  modalClose: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
  modalBody: {
    minHeight: 100,
    padding: 10,
  },
});
