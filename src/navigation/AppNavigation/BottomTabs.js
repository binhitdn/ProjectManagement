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

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {/* <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={createScreenOptions('ホーム', 'home')}
      /> */}
      <Tab.Screen
        name="ProjectTab"
        component={ProjectManagementScreen}
        options={createScreenOptions('案件管理', 'profile')}
      />
      {user.role === 'admin' && (
        <Tab.Screen
          name="ManagementUserStackScreen"
          component={UserManagementScreen}
          options={createScreenOptions('ユーザー管理', 'user')}
        />
      )}
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
    // position: 'absolute',
    // left: '5%',
    // right: '5%',
    // bottom: 20,
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
