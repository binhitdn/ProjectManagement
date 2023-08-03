import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '@constants/styles';

const SearchInput = ({
  onSubmitEditing,
  containerStyle,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef();

  const clearText = () => {
    props.onChangeText('');
  };

  const handleBlurTextInput = () => {
    setIsFocused(false);
    searchRef.current.blur();
  };

  return (
    <View style={[styles.searchContainer, containerStyle]}>
      {isFocused ? (
        <TouchableOpacity
          activeOpacity={1.0}
          style={styles.searchButton}
          onPress={handleBlurTextInput}>
          <Icon name="arrowleft" size={35} color={COLORS.ICON} />
        </TouchableOpacity>
      ) : (
        <Icon
          name="search1"
          size={35}
          color={COLORS.ICON}
          style={styles.searchButton}
        />
      )}

      <TextInput
        ref={searchRef}
        style={[styles.searchInput, inputStyle]}
        placeholderTextColor={COLORS.TEXT}
        {...props}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        onSubmitEditing={() => {
          onSubmitEditing();
          handleBlurTextInput();
        }}
      />

      {props.value.length > 0 && isFocused && (
        <TouchableOpacity onPress={clearText} style={styles.searchButton}>
          <Icon name="close" size={35} color={COLORS.ICON} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
    shadowColor: COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    backgroundColor: COLORS.BACKGROUND,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: COLORS.TEXT,
  },
  searchButton: {
    padding: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    color: '#000',
  },
});
