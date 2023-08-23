import {COLORS} from '@constants/styles';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const SelectInput = ({containerStyle, style, ...props}) => {
  const {data, ...rest} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <Picker {...rest} style={[styles.picker, style]}>
        {data.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

export default SelectInput;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#292929',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
    width: '100%',
  },
  picker: {
    flex: 1,
    color: COLORS.TEXT,
  },
});
