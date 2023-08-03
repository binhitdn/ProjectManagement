import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '@constants/styles';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Divider, Menu} from 'react-native-paper';
import TabBarIcon from '@components/TabBarIcon';
import {updateToken, updateUser} from '@redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Header = () => {
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);
  const handleLogout = () => {
    Alert.alert(
      'Alert',
      'Do you want to logout? ',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: async () => {
            dispatch(updateToken(null));
            await AsyncStorage.removeItem('token');
            dispatch(updateUser(null));
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInfoContainer}>
        <Image
          source={{
            uri: 'https://qpet.vn/wp-content/uploads/2023/04/meme-meo-khoc-thet-6.jpg',
          }}
          style={styles.headerImage}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTextName}>
            {user?.name ? user.name : 'Undefined'}
          </Text>
          <Text style={styles.headerTextSubName}>
            Role: {user?.role ? user.role : 'Undefined'}
          </Text>
        </View>
      </View>
      <View style={styles.ExtraInfo}>
        <Menu
          visible={visibleMenu}
          onDismiss={closeMenu}
          style={styles.menu}
          anchor={
            <Button onPress={openMenu}>
              <TabBarIcon name="ellipsis1" size={30} onPress={openMenu} />
            </Button>
          }>
          <Menu.Item
            onPress={() => {}}
            title="マイアカウント"
            style={styles.menuItem}
          />
          <Divider />
          <Menu.Item
            onPress={handleLogout}
            title="ログアウト"
            style={styles.menuItem}
          />
        </Menu>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerInfoContainer: {
    flexDirection: 'row',
  },
  headerImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  headerTextName: {
    fontWeight: FONTS.WEIGHTS.NAME,
    fontSize: FONTS.SIZES.NAME,
    color: COLORS.TEXT,
  },
  headerTextSubName: {
    fontWeight: FONTS.WEIGHTS.SUB_NAME,
    fontSize: FONTS.SIZES.SUB_NAME,
  },
  ExtraInfo: {
    justifyContent: 'center',
    paddingRight: 10,
  },
});
