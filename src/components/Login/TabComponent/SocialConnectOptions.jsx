import {COLORS} from '@constants/styles';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const connectOptions = [
  {
    id: 'google',
    imageUri:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png',
    name: 'Google',
  },
  {
    id: 'github',
    imageUri:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png',
    name: 'Github',
  },
  {
    id: 'gitlab',
    imageUri:
      'https://gitlab.com/uploads/-/system/project/avatar/4563480/logo-extra-whitespace.png',
    name: 'Gitlab',
  },
  {
    id: 'facebook',
    imageUri:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
    name: 'Facebook',
  },
];

const SocialConnectOptions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.separator}>
        <View style={styles.separatorLine} />
        <Text>or connect with</Text>
        <View style={styles.separatorLine} />
      </View>
      <View style={styles.optionsContainer}>
        {connectOptions.map(option => (
          <TouchableOpacity key={option.id} style={styles.option}>
            <Image source={{uri: option.imageUri}} style={styles.optionIcon} />
            <Text style={styles.optionText}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: 20,
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },
  separatorLine: {
    width: '30%',
    backgroundColor: '#ccc',
    height: 2,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  option: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  optionIcon: {
    width: 20,
    height: 20,
  },
  optionText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
};

export default SocialConnectOptions;
