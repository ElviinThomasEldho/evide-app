import React , { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import TextInputContainer from '../components/TextInput.js';
import RoutePanel from '../components/RoutePanel.js';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet2 from '../components/BottomSheet2.js';
import BottomSheet from '../components/BottomSheet.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ViewRoutes = ({ navigation }) => {
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
      <TextInputContainer navigation={navigation} /> 
      <MapView style={styles.map} region={mapRegion} provider= {PROVIDER_GOOGLE}>
        <Marker coordinate = {mapRegion} title = 'Marker' />
      </MapView>
      <BottomSheet2 navigation={navigation}/>
    </View>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ViewRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scrollViewContent: {
    flexGrow: 1,
    width: windowWidth,
    minHeight: windowHeight, // Ensure the content fills the entire viewport height
    paddingLeft:'5%',
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
  sectionText: {
    paddingTop:'3%',
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 3, // Adjust spacing as needed
  },
});
