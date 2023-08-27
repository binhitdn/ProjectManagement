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
  const {loading} = useSelector(state => state.system);
  const dispatch = useDispatch();

  React.useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  let checkLogin = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('token');

      if (jsonData !== null) {
        dispatch(updateToken(jsonData));
        dispatch(fetchUserInfo(jsonData));
        SplashScreen.hide();
      }
    } catch (error) {
      console.log(error);
    } finally {
      SplashScreen.hide();
    }
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.TRANSPARENT}
        translucent={false}
      />
      {token ? user?._id ? <AppNavigation /> : <Loading /> : <AuthNavigation />}
      {loading && <Loading />}
    </NavigationContainer>
  );
};
export default Main;
