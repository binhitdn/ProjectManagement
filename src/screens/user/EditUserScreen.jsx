import {Text} from 'react-native';
import React, {useState} from 'react';
import {ButtonComponent, Input, Form} from '@components/customize';
import {useDispatch} from 'react-redux';
import {deleteUser, updateUser} from '@redux/slices/userSlice';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@constants/styles';

const EditUserScreen = ({route}) => {
  const [name, setName] = useState('');

  const {user} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  React.useEffect(() => {
    setName(user.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditUser = async () => {
    const data = {
      ...user,
      name,
    };
    dispatch(updateUser(data));
    navigation.goBack();
  };
  const handleDeleteUser = async () => {
    dispatch(deleteUser(user._id));
    navigation.goBack();
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
        Edit User
      </Text>
      <Form.View>
        <Input
          type="text"
          value={name}
          onChangeText={setName}
          placeholder="First Name"
          containerStyle={{flex: 1}}
        />
      </Form.View>

      <ButtonComponent
        title="Edit"
        onPress={handleEditUser}
        style={{
          marginTop: 20,
        }}
      />
      <ButtonComponent
        title="Delete"
        onPress={handleDeleteUser}
        color={COLORS.DANGER}
      />
    </Form.Container>
  );
};

export default EditUserScreen;
