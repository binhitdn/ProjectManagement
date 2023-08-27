import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './BottomTabs';
import ProjectScreen from '@screens/project/ProjectScreen';
import CreateUserScreen from '@screens/user/CreateUserScreen';
import CreateProjectScreen from '@screens/project/CreateProjectScreen';
import EditUserScreen from '@screens/user/EditUserScreen';
import {useSelector} from 'react-redux';

const AppStack = createStackNavigator();
const AppNavigation = () => {
  const {user} = useSelector(state => state.auth);
  const stack = [
    {
      name: 'BottomTab',
      component: BottomTab,
      options: {headerShown: false},
      allowedRoles: ['admin', 'user'],
    },
    {
      name: 'Project',
      component: ProjectScreen,
      allowedRoles: ['admin', 'user'],
    },
    {
      name: 'CreateUser',
      component: CreateUserScreen,
      allowedRoles: ['admin'],
    },
    {
      name: 'CreateProject',
      component: CreateProjectScreen,
      allowedRoles: ['admin'],
    },
    {
      name: 'EditUser',
      component: EditUserScreen,
      allowedRoles: ['admin'],
    },
  ];
  const filteredStack = stack.filter(item => {
    return item.allowedRoles.includes(user.role);
  });

  return (
    <AppStack.Navigator>
      {filteredStack.map((item, index) => (
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
