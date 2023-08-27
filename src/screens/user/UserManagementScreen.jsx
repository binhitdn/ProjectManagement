import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '@constants/styles';
import {Input} from '@components/customize';
import Icon from 'react-native-vector-icons/AntDesign';
import {fetchUsers} from '@redux/slices/userSlice';
import Header from '@components/Header';

const UserManagement = ({navigation}) => {
  const [search, setSearch] = React.useState('');
  const {user, loading} = useSelector(state => state.users);
  const [userView, setUserView] = React.useState([]);
  const dispatch = useDispatch();
  const {error} = useSelector(state => state.users);

  React.useEffect(() => {
    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  React.useEffect(() => {
    if (search === '') {
      setUserView(user);
    } else {
      const filteredUser = user.filter(userI =>
        userI.name.toLowerCase().includes(search.toLowerCase()),
      );
      setUserView(filteredUser);
    }
  }, [search, user]);

  const editUser = item => {
    navigation.navigate('EditUser', {user: item});
  };

  const renderUserItem = ({item}) => (
    <TouchableOpacity style={styles.userItem} onPress={() => editUser(item)}>
      <Image
        source={{
          uri: `https://ui-avatars.com/api/?name=${item.name}&background=random&rounded=true&size=40`,
        }}
        style={{width: 50, height: 50, borderRadius: 20}}
      />
      <View>
        <Text style={styles.username}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text style={{fontSize: 12, color: '#9e9e9e'}}>
          {item.role === 'admin' ? 'Admin' : 'User'}
        </Text>
        <TouchableOpacity
          style={styles.editUser}
          onPress={() => editUser(item)}>
          <Icon name="edit" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View />
    </TouchableOpacity>
  );

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>ユーザー管理</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateUser')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            gap: 8,
          }}>
          <Icon name="pluscircleo" size={24} color="gray" />
          <Text style={{fontSize: 15, color: 'gray'}}>Add user</Text>
        </TouchableOpacity>
        <Input
          type="search"
          value={search}
          onChangeText={setSearch}
          placeholder="Search user"
          placeholderTextColor="gray"
          containerStyle={{marginBottom: 16}}
        />
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        ) : (
          <FlatList
            data={userView}
            renderItem={renderUserItem}
            keyExtractor={item => item._id}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    gap: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  roleText: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
  },
  roleContainer: {
    backgroundColor: COLORS.PRIMARY,
    marginVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  editUser: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    padding: 4,
  },
});

export default UserManagement;
