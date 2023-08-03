import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '@components/Home/Header';
import SearchInput from '@components/SearchBar/SearchInput';
import RecentlyProject from '@components/Home/RecentlyProject';
import {COLORS} from '@constants/styles';

const HomeScreen = () => {
  const [searchText, setSearchText] = React.useState('');

  return (
    <View>
      <Header />
      <SearchInput
        value={searchText}
        onChangeText={setSearchText}
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
        placeholderTextColor={COLORS.PRIMARY}
        placeholder="検索..."
      />
      <RecentlyProject />
      <View>
        <Text />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 20,
  },
  searchInput: {
    fontSize: 20,
  },
});
