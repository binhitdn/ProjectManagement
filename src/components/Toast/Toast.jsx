import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {COLORS} from '@constants/styles';
import {useDispatch, useSelector} from 'react-redux';
import {hideToast} from '@redux/slices/toastSlice';

const HEIGHT = 50;
const POSITION = -50;
export const Toast = () => {
  const [showText, setShowText] = React.useState(false);
  const {show, message} = useSelector(state => state.toast);
  const position = useSharedValue(POSITION);
  const width = useSharedValue(HEIGHT);
  const borderRadius = useSharedValue(50);
  const dispatch = useDispatch();
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      top: position.value,
      width: width.value,
      borderRadius: borderRadius.value,
    };
  }, []);
  React.useEffect(() => {
    //width Spring
    if (show) {
      position.value = withSpring(50, {
        damping: 20,
        stiffness: 90,
        duration: 4000,
      });
      setTimeout(() => {
        setShowText(true);
      }, 1000);
      width.value = withDelay(
        1000,
        withTiming('auto', {
          duration: 4000,
          easing: Easing.linear,
        }),
      );
      setTimeout(() => {
        position.value = withSpring(-50, {
          damping: 20,
          stiffness: 90,
        });
      }, 4000);
      borderRadius.value = withDelay(
        1000,
        withTiming(HEIGHT / 2, {
          duration: 3000,
        }),
      );
    } else {
      resetValue();
    }
  }, [show]);

  const resetValue = () => {
    position.value = POSITION;
    width.value = HEIGHT;
    borderRadius.value = 50;
    dispatch(hideToast());
  };
  return (
    <Animated.View style={[styles.container, reanimatedStyle]}>
      <View style={styles.iconContainer}>
        {/* <Icon name="check" size={20} color={COLORS.PRIMARY} /> */}
      </View>
      <Text style={styles.text}>{showText ? message : ''}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.PRIMARY,
    borderWidth: 4,
    zIndex: 40,
    borderRadius: 20,
    alignSelf: 'center',
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  iconContainer: {
    padding: 10,
    width: HEIGHT,
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
    paddingRight: 10,
  },
});
