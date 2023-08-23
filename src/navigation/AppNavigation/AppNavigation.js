import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './BottomTabs';
import ProjectScreen from '@screens/project/ProjectScreen';
import CreateUserScreen from '@screens/user/CreateUserScreen';
import CreateProjectScreen from '@screens/project/CreateProjectScreen';
import EditUserScreen from '@screens/user/EditUserScreen';

const AppStack = createStackNavigator();
const AppNavigation = () => {
  const stack = [
    {
      name: 'BottomTab',
      component: BottomTab,
      options: {headerShown: false},
    },
    {
      name: 'Project',
      component: ProjectScreen,
    },
    {
      name: 'CreateUser',
      component: CreateUserScreen,
    },
    {
      name: 'CreateProject',
      component: CreateProjectScreen,
    },
    {
      name: 'EditUser',
      component: EditUserScreen,
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
