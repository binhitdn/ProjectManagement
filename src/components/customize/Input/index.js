import React from 'react';
import TextInputComponent from './TextInputComponent';
import SelectInput from './SelectInput';
import SearchInput from './SearchInput';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '@constants/styles';

const Input = React.forwardRef(({type, ...props}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  switch (type) {
    case 'text':
      return <TextInputComponent ref={ref} {...props} />;
    case 'password':
      return (
        <TextInputComponent
          ref={ref}
          {...props}
          secureTextEntry={!showPassword}
          rightIcon={
            <Icon
              name={showPassword ? 'eye' : 'eyeo'}
              size={20}
              onPress={() => setShowPassword(!showPassword)}
              color={COLORS.ICON}
            />
          }
        />
      );
    case 'select':
      return <SelectInput ref={ref} {...props} />;
    case 'search':
      return <SearchInput ref={ref} {...props} />;
    default:
      return null;
  }
});

export default Input;
