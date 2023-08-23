import {Text, ScrollView, Keyboard} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '@constants/styles';
import {ButtonComponent, Form, Input} from '@components/customize';
import styles from '@components/Login/TabComponent/authStyle';
import {register} from '@redux/slices/authSlice';
import {useDispatch} from 'react-redux';

const RegisterTab = () => {
  //states
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassWord: '',
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
    dispatch(
      register({
        name: form.firstName + ' ' + form.lastName,
        email: form.email,
        password: form.password,
      }),
    );
  };

  const handleChange = (name, value) => {
    setForm(prevForm => ({...prevForm, [name]: value}));
  };

  return (
    <ScrollView
      ref={refs.scrollView}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <Form.Container>
        <Text style={styles.loginText}>登録</Text>
        <Form.View
          style={{
            marginBottom: 20,
          }}>
          <Input
            type="text"
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
          <Input
            type="text"
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
        </Form.View>

        <Input
          type="text"
          ref={refs.email}
          placeholder="Eメール"
          placeholderTextColor={COLORS.PLACEHOLDER}
          containerStyle={styles.textInputContainer}
          style={styles.textInput}
          value={form.email}
          onChangeText={text => handleChange('email', text)}
          leftIcon={<Icon name="user" size={20} color={COLORS.ICON} />}
          onSubmitEditing={() => {
            refs.scrollView.current.scrollToEnd({animated: true});
            // refs.password.current.focus();
          }}
        />

        <Input
          type="password"
          ref={refs.password}
          placeholder="パスワード"
          placeholderTextColor={COLORS.PLACEHOLDER}
          containerStyle={styles.textInputContainer}
          style={styles.textInput}
          value={form.password}
          onChangeText={text => handleChange('password', text)}
          onFocus={() => refs.scrollView.current.scrollToEnd({animated: true})}
          leftIcon={<Icon name="lock" size={20} color={COLORS.ICON} />}
          // onSubmitEditing={() => refs.confirmPassWord.current.focus()}
        />

        <Input
          type="password"
          ref={refs.confirmPassWord}
          placeholder="パスワードを確認する"
          placeholderTextColor={COLORS.PLACEHOLDER}
          containerStyle={styles.textInputContainer}
          style={styles.textInput}
          value={form.confirmPassWord}
          onChangeText={text => handleChange('confirmPassWord', text)}
          onFocus={() => refs.scrollView.current.scrollToEnd({animated: true})}
          leftIcon={<Icon name="lock" size={20} color={COLORS.ICON} />}
          onSubmitEditing={handleRegister}
        />

        <ButtonComponent title="登録" onPress={handleRegister} />
      </Form.Container>
    </ScrollView>
  );
};

export default RegisterTab;
