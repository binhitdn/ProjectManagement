import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from '@screens/SettingsScreen';
import HomeScreen from '@screens/HomeScreen';
import TabBarIcon from '@components/TabBarIcon';
import {COLORS} from '@constants/styles';

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const HomeStack = createStackNavigator();

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

const renderTabBarIcon = (color, size, name) => {
  return <TabBarIcon color={color} size={size} name={name} />;
};

const createScreenOptions = (label, iconName) => ({
  tabBarIcon: ({color, size}) => renderTabBarIcon(color, 35, iconName),
  tabBarLabel: label,
});

const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={createScreenOptions('Home', 'home')}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingsStackScreen}
        options={createScreenOptions('Settings', 'user')}
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
