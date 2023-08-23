import {Text, View, Keyboard} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '@constants/styles';
import styles from '@components/Login/TabComponent/authStyle';
import SocialConnectOptions from './SocialConnectOptions';
import {useDispatch} from 'react-redux';
import {login} from '@redux/slices/authSlice';
import {ButtonComponent, Input} from '@components/customize';

const LoginTab = () => {
  // State
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const refs = {
    email: React.useRef(),
    password: React.useRef(),
  };

  const dispatch = useDispatch();

  // handleLogin function
  const handleLogin = async () => {
    dispatch(
      login({
        email: form.email,
        password: form.password,
      }),
    );
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
      <Text style={styles.loginText}>ログイン</Text>

      <Input
        ref={refs.email}
        type="text"
        placeholder="Eメール"
        placeholderTextColor={COLORS.PLACEHOLDER}
        style={styles.textInput}
        containerStyle={styles.textInputContainer}
        value={form.email}
        onChangeText={text => handleChange('email', text)}
        leftIcon={<Icon name="user" size={20} color={COLORS.ICON} />}
        // onSubmitEditing={() => refs.password.current.focus()}
      />

      <Input
        type="password"
        placeholder="パスワード"
        placeholderTextColor={COLORS.PLACEHOLDER}
        style={styles.textInput}
        containerStyle={styles.textInputContainer}
        ref={refs.password}
        value={form.password}
        onChangeText={text => handleChange('password', text)}
        onSubmitEditing={handleLogin}
        secureTextEntry={!form.showPassword}
        leftIcon={<Icon name="lock" size={20} color={COLORS.ICON} />}
      />

      <ButtonComponent title="ログイン" onPress={handleLogin} />
      <SocialConnectOptions />
    </View>
  );
};

export default LoginTab;
