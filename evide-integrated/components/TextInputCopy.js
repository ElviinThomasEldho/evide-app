import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TextInput, StyleSheet, TouchableOpacity,Text } from 'react-native';
const Drawer = createDrawerNavigator();

const TextInputContainer = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.menuButtonContainer}>
          {/* Custom button with three lines */}
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
            <Text style={styles.buttonText}>≡</Text>
          </TouchableOpacity>
      </View>
      
      <TextInput
        style={[styles.textInput, styles.firstTextInput]}
        placeholder="From"
        placeholderTextColor="#FFFFFF" // Set placeholder text color to white
      />
      <TextInput
        style={styles.textInput}
        placeholder="To"
        placeholderTextColor="#FFFFFF" // Set placeholder text color to white
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFC75B',
    width: '100%',
    height: '28%',
    borderRadius: 25,
    padding: '10%',
    position: 'relative',
  },
  textInput: {
    color: '#FFFFFF',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
  },
  firstTextInput: {
    marginTop: '25%',
  },
  menuButtonContainer: {
    position: 'absolute',
    top: '30%',
    left: '5%',
    padding: 10,
  },
  menuButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default TextInputContainer;

