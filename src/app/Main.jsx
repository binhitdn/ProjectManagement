import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from '@navigation/AuthNavigation';
import AppNavigation from '@navigation/AppNavigation/AppNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from '@components/Toast/Toast';
import {MyTheme, DarkThemeCustom} from '@constants/theme';
import {COLORS} from '@constants/styles';
import Loading from '@components/Loading/Loading';
import {updateToken, updateUser} from '@redux/slices/authSlice';
import getPersonalInfo from '@helpers/getPersonalInfo';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
  const {token} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const getDataStart = async tokenData => {
    try {
      const user = await getPersonalInfo(tokenData);
      dispatch(updateUser(user));
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    checkLogin();
  }, []);
  let checkLogin = async () => {
    const jsonData = await AsyncStorage.getItem('token');
    if (jsonData !== null) {
      getDataStart(jsonData);
      dispatch(updateToken(jsonData));
      SplashScreen.hide();
    } else {
      SplashScreen.hide();
    }
  };
  React.useEffect(() => {}, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.TRANSPARENT}
        translucent={false}
      />

      <Toast />
      <Loading />

      {token ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
export default Main;
