import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from '@navigation/AuthNavigation';
import AppNavigation from '@navigation/AppNavigation/AppNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {MyTheme} from '@constants/theme';
import {COLORS} from '@constants/styles';
import Loading from '@components/Loading';
import {fetchUserInfo, updateToken} from '@redux/slices/authSlice';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
  const {token, user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    checkLogin();
  }, []);

  React.useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token));
    }
  }, [token]);

  let checkLogin = async () => {
    const jsonData = await AsyncStorage.getItem('token');
    if (jsonData !== null) {
      dispatch(updateToken(jsonData));
      dispatch(fetchUserInfo(jsonData));
      SplashScreen.hide();
    }
    SplashScreen.hide();
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.TRANSPARENT}
        translucent={false}
      />
      {token ? user?._id ? <AppNavigation /> : <Loading /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
export default Main;
