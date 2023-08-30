import {Text, View, Keyboard, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '@constants/styles';
import styles from '@components/auth/TabComponent/authStyle';
import SocialConnectOptions from '../SocialConnectOptions';
import {useDispatch} from 'react-redux';
import {login} from '@redux/slices/authSlice';
import {ButtonComponent, Input, ModalComponent} from '@components/customize';
import axios from '@axios';
import {handleForgotPasswordApi} from '@api/authApi';
import {toggleLoading} from '@redux/slices/systemSlice';

const LoginTab = () => {
  // State
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [modalEnterEmailForgot, setModalEnterEmailForgot] =
    React.useState(false);
  const [modalResetPassword, setModalResetPassword] = React.useState(false);
  const [emailReset, setEmailReset] = React.useState('');
  const [passwordReset, setPasswordReset] = React.useState('');
  const [passwordConfirmReset, setPasswordConfirmReset] = React.useState('');
  const [resetUrl, setResetUrl] = React.useState('');

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleForgotPassword = async () => {
    try {
      setModalEnterEmailForgot(false);
      dispatch(toggleLoading(true));
      const res = await handleForgotPasswordApi(emailReset);
      setResetUrl(res.data.resetUrl);

      if (res.data.success) {
        setModalResetPassword(true);
      } else {
        setModalEnterEmailForgot(true);
        Alert.alert('Error', 'メールアドレスが見つかりません。');
      }
      dispatch(toggleLoading(false));
    } catch (error) {
      setModalEnterEmailForgot(true);
      Alert.alert('Error', 'メールアドレスが見つかりません。');
    } finally {
      setEmailReset('');
      setPasswordReset('');
      setPasswordConfirmReset('');
      dispatch(toggleLoading(false));
    }
  };
  const handleResetPassword = async () => {
    try {
      const res = await axios.post(resetUrl, {
        password: passwordReset,
      });
      if (res.data.success) {
        setModalResetPassword(false);
        Alert.alert('Success', 'パスワードが変更されました。');
      } else {
        Alert.alert('Error', 'パスワードが変更されませんでした。');
      }
    } catch (error) {
      Alert.alert('Error', 'パスワードが変更されませんでした。');
    } finally {
      setPasswordReset('');
      setPasswordConfirmReset('');
    }
  };

  return (
    <>
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
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => {
            setModalEnterEmailForgot(true);
          }}>
          <Text style={styles.forgotPasswordText}>
            パスワードを忘れましたか？
          </Text>
        </TouchableOpacity>

        <ButtonComponent title="ログイン" onPress={handleLogin} />
        <SocialConnectOptions />
      </View>
      <ModalComponent
        textHeader={'パスワードを忘れましたか？'}
        isVisible={modalEnterEmailForgot}
        setModalVisible={setModalEnterEmailForgot}>
        <Input
          type="text"
          placeholder="Eメール"
          placeholderTextColor={COLORS.PLACEHOLDER}
          style={styles.textInput}
          containerStyle={styles.textInputContainer}
          value={emailReset}
          onChangeText={text => setEmailReset(text)}
          leftIcon={<Icon name="user" size={20} color={COLORS.ICON} />}
        />
        <ButtonComponent title="送信" onPress={() => handleForgotPassword()} />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => {
            setModalEnterEmailForgot(false);
          }}>
          <Text style={styles.forgotPasswordText}>戻る</Text>
        </TouchableOpacity>
      </ModalComponent>
      <ModalComponent
        textHeader={'パスワードをリセット'}
        isVisible={modalResetPassword}
        setModalVisible={setModalResetPassword}>
        <Input
          type="text"
          placeholder="パスワード"
          placeholderTextColor={COLORS.PLACEHOLDER}
          style={styles.textInput}
          containerStyle={styles.textInputContainer}
          value={passwordReset}
          onChangeText={value => setPasswordReset(value)}
          onSubmitEditing={handleLogin}
          secureTextEntry={!form.showPassword}
          leftIcon={<Icon name="lock" size={20} color={COLORS.ICON} />}
        />
        <Input
          type="text"
          placeholder="パスワード確認"
          placeholderTextColor={COLORS.PLACEHOLDER}
          style={styles.textInput}
          containerStyle={styles.textInputContainer}
          value={passwordConfirmReset}
          onChangeText={value => setPasswordConfirmReset(value)}
          onSubmitEditing={handleLogin}
          secureTextEntry={!form.showPassword}
          leftIcon={<Icon name="lock" size={20} color={COLORS.ICON} />}
        />

        <ButtonComponent
          title="送信"
          onPress={() => {
            handleResetPassword();
          }}
        />
      </ModalComponent>
    </>
  );
};

export default LoginTab;
