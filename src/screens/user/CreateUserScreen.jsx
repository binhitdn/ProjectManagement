import {Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {ButtonComponent, Input, Form} from '@components/customize';
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '@redux/slices/userSlice';
import {useNavigation} from '@react-navigation/native';
import roles from '@constants/role';

const CreateUserScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const {error} = useSelector(state => state.users);
  const navigation = useNavigation();

  const validate = () => {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  };
  const handleCreateUser = async () => {
    if (!validate()) {
      Alert.alert('Password and Confirm Password not match');
      return;
    }
    const data = {
      name: `${firstName}${lastName}`,
      email,
      role,
      password,
    };
    if (!error) {
      dispatch(createUser(data));
      navigation.goBack();
    }
  };

  return (
    <Form.Container
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 2,
        marginTop: 20,
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>
        Create User
      </Text>
      <Form.View style={{marginBottom: 10}}>
        <Input
          type="text"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          containerStyle={{flex: 1}}
        />
        <Input
          type="text"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          containerStyle={{flex: 1}}
        />
      </Form.View>
      <Form.View style={{marginBottom: 10}}>
        <Input
          type="text"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          containerStyle={{flex: 1}}
        />
        <Input
          type="select"
          data={roles}
          selectedValue={role}
          onValueChange={setRole}
          containerStyle={{flex: 1}}
        />
      </Form.View>
      <Input
        type="password"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        containerStyle={{marginBottom: 10}}
      />
      <Input
        type="password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        containerStyle={{marginBottom: 10}}
      />
      <ButtonComponent title="Create" onPress={handleCreateUser} />
    </Form.Container>
  );
};

export default CreateUserScreen;
