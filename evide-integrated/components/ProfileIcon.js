import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const ProfileIcon = ({ onPress, imageSource }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.circularButton}>
      <Image source={imageSource} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circularButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#2675EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 39,
    height: 39,
    borderRadius: 30,
  },
});

export default ProfileIcon;
