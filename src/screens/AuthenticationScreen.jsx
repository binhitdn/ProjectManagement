import {View, ImageBackground, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RegisterTab from '@components/Login/TabComponent/RegisterTab';
import LoginTab from '@components/Login/TabComponent/LoginTab';
import {COLORS} from '@constants/styles';
import FormContainer from '@components/FormContainer/FormContainer';

// MainContainer
const AuthenticationScreen = () => {
  return (
    <FormContainer style={styles.MainContainer}>
      <ImageComponent />
      <FormComponent />
    </FormContainer>
  );
};

// ImageComponent
const ImageComponent = () => {
  return (
    <View style={styles.firstContainer}>
      <ImageBackground
        source={require('@assets/images/background.jpg')}
        style={styles.background}
      />
    </View>
  );
};

// FormComponent
// This component is the login and register tab
const FormComponent = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.secondContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.TRANSPARENT}
        translucent
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: COLORS.TEXT,
          },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.PRIMARY,
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: COLORS.BACKGROUND,
          },
        }}>
        <Tab.Screen
          name="LoginTabTop"
          component={LoginTab}
          options={{
            tabBarLabel: 'Login',
          }}
        />

        <Tab.Screen
          name="RegisterTapTop"
          component={RegisterTab}
          options={{
            tabBarLabel: 'Register',
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default AuthenticationScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  firstContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  background: {
    width: '100%',
    height: '100%',
  },

  secondContainer: {
    flex: 2,
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
