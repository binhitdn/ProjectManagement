import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = ({visible = false}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@assets/lotties/loading.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
});
