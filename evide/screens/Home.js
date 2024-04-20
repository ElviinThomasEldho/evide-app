import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput, Image, Button } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import TextInputContainer from '../components/TextInput.js';
import BottomSheet from '../components/BottomSheet.js';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BottomSheet2 from '../components/BottomSheet2.js';

const windowHeight = Dimensions.get('window').height;
const Home =({navigation}) =>{
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.421,
  });
  const userLocaton = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission for location access denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  }
  useEffect(() => {
    userLocaton();
  },[])
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <BottomSheetModalProvider>
    <View style={styles.container}>
      <TextInputContainer navigation={navigation}/>
      <MapView style={styles.map} region={mapRegion} provider= {PROVIDER_GOOGLE}>
        <Marker coordinate = {mapRegion} title = 'Marker' />
      </MapView>
      {/*<TouchableOpacity style={styles.goButtonContainer} onPress={userLocaton}>
        <View style={styles.goButton}>
          <Text style={styles.goButtonText}>Go</Text>
        </View>
</TouchableOpacity> */}
      <BottomSheet navigation={navigation}/>
    </View>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    marginBottom: 0, // Remove or set to 0
    zIndex: -1,

  },
  goButtonContainer: {
    position: 'absolute',
    bottom: windowHeight * 0.06, // Adjust the button position as needed
    alignSelf: 'center',
    elevation: 1, // Ensure the button appears on top
  },
  goButton: {
    backgroundColor: '#FFC75B',
    borderRadius: 20, // Adjust border radius as needed
    paddingHorizontal: '20%',
    paddingVertical: '5%',
    alignItems: 'center',
  },
  goButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;

