import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS} from '@constants/styles';

const Picker = ({data, value, setValue, open, setOpen}) => {
  return (
    <DropDownPicker
      items={
        Array.isArray(data)
          ? data.map(item => ({
              label: item.name,
              value: item._id,
            }))
          : []
      }
      value={value}
      setValue={(value, index) => {
        setValue(value);
      }}
      open={open}
      setOpen={() => setOpen(!open)}
      maxHeight={400}
      autoScroll
      placeholder="Select Assignees"
      placeholderStyle={{
        color: '#ccc',
        fontSize: 12,
        fontWeight: 'bold',
      }}
      multiple={true}
      min={0}
      max={10}
      mode="BADGE"
      badgeColors={['red', 'green', 'blue', 'black']}
      badgeTextStyle={{
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
      }}
      badgeDotColors={['white']}
      style={{
        borderColor: COLORS.PRIMARY,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
      }}
    />
  );
};

export default Picker;
