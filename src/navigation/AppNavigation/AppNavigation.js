import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '@screens/SettingsScreen';
import BottomTab from './BottomTabs';

const AppStack = createStackNavigator();
const AppNavigation = () => {
  const stack = [
    {
      name: 'BottomTab',
      component: BottomTab,
      options: {headerShown: false},
    },
    {
      name: 'Settings',
      component: SettingsScreen,
      options: {headerShown: false},
    },
  ];
  return (
    <AppStack.Navigator>
      {stack.map((item, index) => (
        <AppStack.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
    </AppStack.Navigator>
  );
};

export default AppNavigation;
