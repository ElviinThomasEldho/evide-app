import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Linking, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import polyline from "@mapbox/polyline";

import ProfileIcon from "../components/ProfileIcon";
import BottomModalContainer from "../components/BottomModalContainer";
import TrackingModal from "../components/TrackingModal";

import { useRoute } from "@react-navigation/native";

const TrackingScreen = ({ navigation }) => {
  const r = useRoute();
  const { routeValue } = r.params; 
 
  // const API_KEY = process.env.API_KEY;
  const API_KEY = "AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384";

  const [markers, setMarkers] = useState([]);

  const mapRef = useRef();
  const originRef = useRef();
  const destinationRef = useRef();
  const [currentStep, setCurrentStep] = useState(0);

  const [checkStatus, setCheckStatus] = useState(false);
  const [showNavigate, setShowNavigate] = useState(false);

  const [route, setRoute] = useState()

  useEffect(() => {
    setRoute(routeValue)
    console.log("Start : ", route?.legs[0].start_location);
    console.log("End : ", route?.legs[0].end_location);
    originRef.current.setAddressText(route?.legs[0].start_address);
    destinationRef.current.setAddressText(route?.legs[0].end_address);

    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      // setLocation(currentLocation);
      console.log("Location : ");
      console.log(currentLocation);

      mapRef.current?.animateToRegion({
        latitude: currentLocation?.coords.latitude,
        longitude: currentLocation?.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      });

      // setPolylineCoordinates(
      //   polyline.decode(route?.overview_polyline.points).map((coord) => {
      //     return { latitude: coord[0], longitude: coord[1] };
      //   })
      // );

      originRef.current.setAddressText(route.legs[0].start_address)
      destinationRef.current.setAddressText(route.legs[0].end_address)
    };

    getPermissions();
    // console.log("Steps: ", route?.legs[0].steps);

    if (route?.legs[0]?.steps) {
      const newMarkers = route.legs[0].steps.map((parentStep) => ({
        latitude: parentStep.end_location.lat,
        longitude: parentStep.end_location.lng,
        instruction: parentStep.html_instructions,
        completed: false,
      }));
    
      setMarkers((oldMarkers) => [...oldMarkers, ...newMarkers]);
    }
    
    if (route?.legs[0].steps[currentStep].travel_mode == "WALKING")
      setShowNavigate(true);
    console.log(route?.legs[0].steps[currentStep].travel_mode);
  }, []);

  const checkStep = (coordinate) => {
    const distanceEndCurrent = getDistance(
      {
        latitude: coordinate.nativeEvent.coordinate.latitude,
        longitude: coordinate.nativeEvent.coordinate.longitude,
      },
      {
        latitude: route?.legs[0].steps[currentStep].end_location.lat,
        longitude: route?.legs[0].steps[currentStep].end_location.lng,
      }
    );

    if (distanceEndCurrent < 50) {
      console.log("Check step completion");
      setCheckStatus(true);
    }
  };

  const navigate = () => {
    console.log(route?.legs[0].steps[currentStep].travel_mode);

    if (route?.legs[0].steps[currentStep].travel_mode == "WALKING") {
      setShowNavigate(true);
      const destinationLatitude =
        route?.legs[0].steps[currentStep].end_location.lat;
      const destinationLongitude =
        route?.legs[0].steps[currentStep].end_location.lng;
      const travelMode = "walking";
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destinationLatitude},${destinationLongitude}&travelmode=${travelMode}`;

      Linking.openURL(url).catch((err) =>
        console.error("An error occurred", err)
      );
    } else {
      setShowNavigate(false);
      console.log("Transit Mode");
    }

    console.log(showNavigate);
  };

  const updateStep = () => {
    setCurrentStep((old) => old + 1);
    setCheckStatus(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            {/* <View style={styles.menuButtonContainer}>
              <MaterialIcons name="menu" size={20} color="#000"/>
            </View> */}
            <ProfileIcon
              onPress={() => navigation.toggleDrawer()} // Example onPress function
              imageSource={require("../assets/img/profile.png")} // Example image source
            />
            <GooglePlacesAutocomplete
              placeholder="Enter Origin"
              ref={originRef}
              styles={{ textInput: styles.locationInput }}
              onPress={(data, details = null) => {
                setOrigin(data.description);
              }}
              query={{
                key: "AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384",
                language: "en",
              }}
            />
            <GooglePlacesAutocomplete
              ref={destinationRef}
              styles={{
                textInput: styles.locationInput,
                listView: { position: "absolute", top: 50, zIndex: 2 },
              }}
              placeholder="Enter Destination"
              onPress={(data, details = null) => {
                // console.log("Destination : ", data, details);
                setDestination(data.description);
              }}
              query={{
                key: "AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384",
                language: "en",
              }}
            />
          </View>

          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            showsUserLocation
            // userLocationUpdateInterval={10000}
            followsUserLocation={true}
            onUserLocationChange={checkStep}
          >
            {markers.map((marker, index) => (
              <Marker
                key={`m${index}`}
                coordinate={marker}
                pinColor={"#000000"}
              />
            ))}

            {route && (
              <Polyline
                coordinates={polyline
                  .decode(route?.overview_polyline.points)
                  .map((coord) => {
                    return { latitude: coord[0], longitude: coord[1] };
                  })}
                strokeColor={"#FFC75B"} // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={6}
              />
            )}
          </MapView>
          <BottomModalContainer buttonTitle="View Route">
            {showNavigate && (
              <TouchableOpacity style={styles.btnPrimary} onPress={navigate}>
                <Text style={styles.btnPrimaryText}>Navigate</Text>
              </TouchableOpacity>
            )}
            {checkStatus && (
              <>
                <Text style={{ textAlign: "center" }}>Have you reached?</Text>
                <TouchableOpacity
                  style={styles.btnPrimary}
                  onPress={updateStep}
                >
                  <Text style={styles.btnPrimaryText}>Yes</Text>
                </TouchableOpacity>
              </>
            )}
            <TrackingModal route={route} currentStep={currentStep} />
          </BottomModalContainer>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const CONTAINER_PADDING = 10;
const BUTTON_WIDTH = "80%";
const INPUT_WIDTH = 500;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100vw",
    justifyContent: "space-between",
    alignItems: "center",
    padding: CONTAINER_PADDING,
  },
  inputContainer: {
    minHeight: 200,
    width: "100%",
    justifyContent: "space-around",
    alignContent: "center",
    padding: CONTAINER_PADDING,
    marginTop: 20,
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    // width: "100%",
    height: "100vh",
    marginBottom: 0,
    zIndex: -1,
  },
  goButtonContainer: {
    position: "absolute",
    bottom: CONTAINER_PADDING,
    alignSelf: "center",
    elevation: 1,
  },
  goButton: {
    backgroundColor: "#FFC75B",
    borderRadius: 20,
    paddingHorizontal: "20%",
    paddingVertical: "5%",
    alignItems: "center",
    width: BUTTON_WIDTH,
  },
  goButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationInput: {
    color: "black",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    width: "100%",
    padding: CONTAINER_PADDING,
    marginBottom: CONTAINER_PADDING,
    borderWidth: 1,
    borderColor: "#2675EC",
    fontWeight: "600",
  },
  textInput: {
    color: "black",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    width: INPUT_WIDTH,
    padding: CONTAINER_PADDING,
    marginBottom: CONTAINER_PADDING,
    borderWidth: 1,
    borderColor: "#2675EC",
    fontWeight: "600",
  },
  firstTextInput: {
    marginTop: CONTAINER_PADDING,
  },
  menuButtonContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    padding: CONTAINER_PADDING,
  },
  menuButton: {
    width: "200%",
    height: "100%",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  btnPrimary: {
    backgroundColor: "#FFC75B",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
  },
  btnPrimaryText: {
    fontWeight: "bold",
  },
});
export default TrackingScreen;
