import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '@components/HomeScreen/Header';
import SearchInput from '@components/SearchBar/SearchInput';
import RecentlyProject from '@components/HomeScreen/RecentlyProject';

const HomeScreen = () => {
  const [searchText, setSearchText] = React.useState('');

  return (
    <View>
      <Header />
      <SearchInput
        value={searchText}
        onChangeText={setSearchText}
        containerStyle={styles.searchContainer}
      />
      <RecentlyProject />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 20,
  },
});
