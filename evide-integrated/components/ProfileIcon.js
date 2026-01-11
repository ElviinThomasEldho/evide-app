import React from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';

/**
 * ProfileIcon component - displays a circular profile icon button
 * @param {Object} props - Component props
 * @param {Function} props.onPress - Callback function when icon is pressed
 * @param {Object} props.imageSource - Image source for the profile icon
 */
const ProfileIcon = ({ onPress, imageSource }) => {
  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => [
        styles.circularButton,
        pressed && styles.pressed
      ]}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', borderless: true }}
    >
      <Image source={imageSource} style={styles.image} />
    </Pressable>
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
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  image: {
    width: 39,
    height: 39,
    borderRadius: 30,
  },
});

export default React.memo(ProfileIcon);
