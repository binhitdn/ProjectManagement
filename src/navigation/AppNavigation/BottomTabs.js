import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from '@screens/SettingsScreen';
import HomeScreen from '@screens/HomeScreen';
import TabBarIcon from '@components/TabBarIcon';
import {COLORS} from '@constants/styles';
import ManagerUser from '@screens/ManagerUser';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ManagerUserStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
  </HomeStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{headerShown: false}}
    />
  </SettingsStack.Navigator>
);
const ManagerUserStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="ManagerUser"
      component={ManagerUser}
      options={{headerShown: false}}
    />
  </SettingsStack.Navigator>
);

const renderTabBarIcon = (color, size, name) => {
  return <TabBarIcon color={color} size={size} name={name} />;
};

const createScreenOptions = (label, iconName) => ({
  tabBarIcon: ({color, size}) => renderTabBarIcon(color, 35, iconName),
  tabBarLabel: label,
});

const BottomTab = () => {
  const {user} = useSelector(state => state.auth);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={createScreenOptions('ホーム', 'home')}
      />
      {user.role === 'admin' && (
        <Tab.Screen
          name="ManagerUserStackScreen"
          component={ManagerUserStackScreen}
          options={createScreenOptions('ユーザー管理', 'user')}
        />
      )}
      <Tab.Screen
        name="SettingTab"
        component={SettingsStackScreen}
        options={createScreenOptions('設定', 'setting')}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const screenOptions = {
  headerShown: false,
  tabBarActiveTintColor: COLORS.ICON,
  tabBarInactiveTintColor: COLORS.TEXT_SECONDARY,
  tabBarStyle: {
    backgroundColor: '#fff',
    height: 80,
    paddingBottom: 10,
    position: 'absolute',
    left: '5%',
    right: '5%',
    bottom: 20,
    borderRadius: 5,
    headerShown: false,
    shadowColor: COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
};
