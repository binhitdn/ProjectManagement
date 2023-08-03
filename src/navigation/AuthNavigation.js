import React from 'react';
import AuthenticationScreen from '@screens/AuthenticationScreen';
import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Authentication"
        component={AuthenticationScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};
export default AuthNavigation;
