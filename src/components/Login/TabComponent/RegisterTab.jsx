import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '@constants/styles';
import TextInputComponent from '@components/TextInput/TextInputComponent';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@utils/validate';
import styles from '@styles/Login/authStyle';
import {handleRegisterApi} from '@api/authApi';
import {updateToken, updateUser} from '@redux/slices/authSlice';
import {useDispatch} from 'react-redux';
import getPersonalInfo from '@helpers/getPersonalInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterTab = () => {
  //states
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassWord: '',
    showPassword: false,
  });

  // States error
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  // Inputs ref
  const refs = {
    firstName: React.useRef(),
    lastName: React.useRef(),
    email: React.useRef(),
    password: React.useRef(),
    confirmPassWord: React.useRef(),
    scrollView: React.useRef(),
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
  // handleRegister function
  const handleRegister = async () => {
    const {firstName, lastName, email, password, confirmPassWord} = form;
    const nameValidation = validateName(firstName, lastName);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(
      password,
      confirmPassWord,
    );

    setErrors({
      name: nameValidation.error,
      email: emailValidation.error,
      password: passwordValidation.error,
      confirmPassword: confirmPasswordValidation.error,
    });

    if (
      nameValidation.isValid &&
      emailValidation.isValid &&
      passwordValidation.isValid &&
      confirmPasswordValidation.isValid
    ) {
      let fullName = lastName + firstName;
      let data = {
        name: fullName,
        email: email,
        password: password,
      };
      try {
        const response = await handleRegisterApi(data);
        console.log(response);
        if (response.data.success) {
          Alert.alert('Success', 'Register Success');
          await AsyncStorage.setItem('token', response.data.token);
          try {
            const personalInfo = await getPersonalInfo(response.data.token);
            dispatch(updateUser(personalInfo));
          } catch (error) {
            console.log(error);
          }
          dispatch(updateToken(response.data.token));
        }
      } catch (error) {
        if (error.response) {
          Alert.alert('Error', error.response.data.error);
        }
      }
    }
  };

  const handleChange = (name, value) => {
    setForm(prevForm => ({...prevForm, [name]: value}));
  };

  return (
    <ScrollView
      ref={refs.scrollView}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.loginText}>Register</Text>

        <View style={styles.inputsName}>
          <TextInputComponent
            ref={refs.firstName}
            placeholder="First Name"
            placeholderTextColor={COLORS.PLACEHOLDER}
            style={styles.textInput}
            value={form.firstName}
            onChangeText={text => handleChange('firstName', text)}
            containerStyle={{flex: 1}}
            leftIcon={<Icon name="user" size={20} color={COLORS.ICON} />}
            // onSubmitEditing={() => refs.lastName.current.focus()}
          />
          <TextInputComponent
            ref={refs.lastName}
            placeholder="Last Name"
            placeholderTextColor={COLORS.PLACEHOLDER}
            style={styles.textInput}
            value={form.lastName}
            onChangeText={text => handleChange('lastName', text)}
            containerStyle={{flex: 1}}
            leftIcon={<Icon name="user" size={20} color={COLORS.ICON} />}
            // onSubmitEditing={() => refs.email.current.focus()}
          />
        </View>
        <Text style={styles.errorText}>{errors.name ? errors.name : null}</Text>
        <TextInputComponent
          ref={refs.email}
          placeholder="Email"
          placeholderTextColor={COLORS.PLACEHOLDER}
          style={styles.textInput}
          value={form.email}
          onChangeText={text => handleChange('email', text)}
          leftIcon={<Icon name="user" size={20} color={COLORS.ICON} />}
          onSubmitEditing={() => {
            refs.scrollView.current.scrollToEnd({animated: true});
            // refs.password.current.focus();
          }}
        />
        <Text style={styles.errorText}>
          {' '}
          {errors.email ? errors.email : null}
        </Text>
        <TextInputComponent
          ref={refs.password}
          placeholder="Password"
          placeholderTextColor={COLORS.PLACEHOLDER}
          style={styles.textInput}
          value={form.password}
          onChangeText={text => handleChange('password', text)}
          onFocus={() => refs.scrollView.current.scrollToEnd({animated: true})}
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
          // onSubmitEditing={() => refs.confirmPassWord.current.focus()}
        />
        <Text style={styles.errorText}>
          {errors.password ? errors.password : null}
        </Text>
        <TextInputComponent
          ref={refs.confirmPassWord}
          placeholder="Confirm Password"
          placeholderTextColor={COLORS.PLACEHOLDER}
          style={styles.textInput}
          value={form.confirmPassWord}
          onChangeText={text => handleChange('confirmPassWord', text)}
          onFocus={() => refs.scrollView.current.scrollToEnd({animated: true})}
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
          onSubmitEditing={handleRegister}
        />
        <Text style={styles.errorText}>
          {errors.confirmPassword ? errors.confirmPassword : null}
        </Text>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterTab;
