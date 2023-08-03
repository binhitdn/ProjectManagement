import {Text, View, TouchableOpacity, Keyboard} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '@constants/styles';
import TextInputComponent from '@components/TextInput/TextInputComponent';
import {validateEmail, validatePassword} from '@utils/validate';
import styles from '@styles/Login/authStyle';
import SocialConnectOptions from './SocialConnectOptions';
import {useToast} from '@hooks/useToast';
import {handleLoginApi} from '@api/authApi';
import {useDispatch} from 'react-redux';
import {updateUser, updateToken} from '@redux/slices/authSlice';
import getPersonalInfo from '@helpers/getPersonalInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginTab = () => {
  // State
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });
  const refs = {
    email: React.useRef(),
    password: React.useRef(),
  };
  const {showMessage} = useToast();
  const dispatch = useDispatch();

  // handleLogin function
  const handleLogin = async () => {
    const {email, password} = form;
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setErrors({
      email: emailValidation.error,
      password: passwordValidation.error,
    });
    if (emailValidation.isValid && passwordValidation.isValid) {
      try {
        const response = await handleLoginApi({email, password});
        if (response.data.success) {
          await AsyncStorage.setItem('token', response.data.token);
          const personalInfo = await getPersonalInfo(response.data.token);
          dispatch(updateUser(personalInfo));
          dispatch(updateToken(response.data.token));
          showMessage('Login Success');
        } else {
          showMessage(
            response.data.error
              ? response.data.error
              : 'Login Failed. Please try again',
          );
        }
      } catch (error) {
        showMessage(
          error.response.data.error
            ? error.response.data.error
            : 'An error occurred. Please try again',
        );
      }
    } else {
      showMessage('Login Failed. Please try again');
    }
  };

  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };
  React.useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Object.values(refs).forEach(ref => {
          if (
            ref !== refs.scrollView &&
            ref.current &&
            ref.current.isFocused()
          ) {
            ref.current.blur();
          }
        });
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>

      <TextInputComponent
        ref={refs.email}
        placeholder="Email"
        placeholderTextColor={COLORS.PLACEHOLDER}
        style={styles.textInput}
        value={form.email}
        onChangeText={text => handleChange('email', text)}
        leftIcon={<Icon name="user" size={20} color={COLORS.ICON} />}
        // onSubmitEditing={() => refs.password.current.focus()}
      />
      <Text style={styles.errorText}>{errors.email ? errors.email : ''}</Text>
      <TextInputComponent
        placeholder="Password"
        placeholderTextColor={COLORS.PLACEHOLDER}
        style={styles.textInput}
        ref={refs.password}
        value={form.password}
        onChangeText={text => handleChange('password', text)}
        onSubmitEditing={handleLogin}
        secureTextEntry={!form.showPassword}
        leftIcon={<Icon name="lock" size={20} color={COLORS.ICON} />}
        rightIcon={
          <Icon
            name={form.showPassword ? 'eye-slash' : 'eye'}
            size={20}
            onPress={() => handleChange('showPassword', !form.showPassword)}
            color={COLORS.ICON}
          />
        }
      />
      <Text style={styles.errorText}>
        {errors.password ? errors.password : ''}
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <SocialConnectOptions />
    </View>
  );
};

export default LoginTab;
