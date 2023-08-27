import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBarIcon from '@components/TabBarIcon';
import {COLORS} from '@constants/styles';
import UserManagementScreen from '@screens/user/UserManagementScreen';
import {useSelector} from 'react-redux';
import ProjectManagementScreen from '@screens/project/ProjectManagementScreen';

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (size, name) => {
  return <TabBarIcon size={size} name={name} />;
};

const createScreenOptions = (label, iconName) => ({
  tabBarIcon: ({size}) => renderTabBarIcon(30, iconName),
  tabBarLabel: label,
});

const BottomTab = () => {
  const {user} = useSelector(state => state.auth);

  const tabScreens = [
    {
      name: 'ProjectTab',
      component: ProjectManagementScreen,
      options: createScreenOptions('案件管理', 'profile'),
      allowedRoles: ['admin', 'user'],
    },
    {
      name: 'ManagementUserStackScreen',
      component: UserManagementScreen,
      options: createScreenOptions('ユーザー管理', 'user'),
      allowedRoles: ['admin'],
    },
  ];
  const filteredTabScreens = tabScreens.filter(item => {
    return item.allowedRoles.includes(user.role);
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {filteredTabScreens.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTab;

const screenOptions = {
  headerShown: false,
  tabBarActiveTintColor: COLORS.PRIMARY,
  tabBarInactiveTintColor: 'gray',
  tabBarStyle: {
    backgroundColor: '#fff',
    height: '10%',
    paddingBottom: 10,
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
