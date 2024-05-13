import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Button } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BottomModalContainer from "../components/BottomModalContainer";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import axios from "axios";
import ProfileIcon from "../components/ProfileIcon";

import RoutesModal from "../components/RoutesModal";

const Home = ({ navigation }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState();

  const [markers, setMarkers] = useState([]);

  const [shortestTimeBus, setShortestTimeBus] = useState();
  const [shortestDistanceBus, setShortestDistanceBus] = useState();
  const [lowestFareBus, setLowestFareBus] = useState();

  const [selectedSortCriteria, setSelectedSortCriteria] = useState(null);

  // const API_KEY = process.env.API_KEY;
  const API_KEY = "AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384";

  const mapRef = useRef();
  const originRef = useRef();
  const destinationRef = useRef();

  useEffect(() => {
    console.log("API_KEY : ", API_KEY);

    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log("Location : ");
      console.log(currentLocation);

      mapRef.current?.animateToRegion({
        latitude: currentLocation?.coords.latitude,
        longitude: currentLocation?.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      });

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&key=${API_KEY}`
      );
      console.log(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&key=${API_KEY}`
      );
      originRef.current.setAddressText(
        response.data.results[0]?.formatted_address
      );
      destinationRef.current.focus();
      setOrigin(response.data.results[0]?.formatted_address);
    };

    getPermissions();
  }, []);

  // Function to find nearest metro station
  const findNearestMetroStation = (coordinates) => {
    // Mock data for metro stations
    const metroStations = [
      { name: "Aluva", lat: 10.1099872, lng: 76.3495149 },
      { name: "Pulinchodu", lat: 10.0951, lng: 76.3466 },
      { name: "Companypady", lat: 10.0873, lng: 76.3428 },
      { name: "Ambattukavu", lat: 10.0792806, lng: 76.3388894 },
      { name: "Muttom", lat: 10.0727011, lng: 76.33375 },
      { name: "Kalamassery", lat: 10.0630188, lng: 76.3279715 },
      { name: "CUSAT", lat: 10.0468491, lng: 76.3182738 },
      { name: "Pathadipalam", lat: 10.0361, lng: 76.3144 },
      { name: "Edapally", lat: 10.025263, lng: 76.3083641 },
      { name: "Changampuzha Park", lat: 10.0152041, lng: 76.3023872 },
      { name: "Palarivattom", lat: 10.0063373, lng: 76.3048456 },
      { name: "JLN Stadium", lat: 10.0003003, lng: 76.2991852 },
      { name: "Kaloor", lat: 9.9943, lng: 76.2914 },
      { name: "Town Hall", lat: 9.9914, lng: 76.2884 },
      { name: "MG Road", lat: 9.983496, lng: 76.282263 },
      { name: "Maharaja’s College", lat: 9.9732357, lng: 76.2850733 },
      { name: "Ernakulam South", lat: 9.9685, lng: 76.2893 },
      { name: "Kadavanthra", lat: 9.966593, lng: 76.298074 },
      { name: "Elamkulam", lat: 9.9672125, lng: 76.3086071 },
      { name: "Vyttila", lat: 9.9673739, lng: 76.3204215 },
      { name: "Thaikoodam", lat: 9.960079, lng: 76.323483 },
      { name: "Pettah", lat: 9.9525568, lng: 76.3300456 },
      { name: "Vadakkekotta", lat: 9.952771, lng: 76.339277 },
      { name: "SN Junction", lat: 9.954662, lng: 76.345919 },
      { name: "Thrippunithura", lat: 9.9504507, lng: 76.3517069 },
    ];

    let minDistance = Number.MAX_VALUE;
    let nearestStation = null;
    for (const station of metroStations) {
      const distance = calculateDistance(coordinates, station);
      if (distance < minDistance) {
        minDistance = distance;
        nearestStation = station;
      }
    }
    return nearestStation;
  };

  // Function to calculate distance between two coordinates (in meters)
  const calculateDistance = (coord1, coord2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (coord1.lat * Math.PI) / 180;
    const φ2 = (coord2.lat * Math.PI) / 180;
    const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
    const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const getroutes = async () => {
    try {
      const originResponse = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: origin,
            key: API_KEY,
          },
        }
      );
      const originCoordinates =
        originResponse.data.results[0]?.geometry.location;

      const destinationResponse = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: destination,
            key: API_KEY,
          },
        }
      );
      const destinationCoordinates =
        destinationResponse.data.results[0]?.geometry.location;

      const nearestMetroToOrigin = findNearestMetroStation(originCoordinates);
      const nearestMetroToDestination = findNearestMetroStation(
        destinationCoordinates
      );

      console.log(originCoordinates, destinationCoordinates);

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=transit&key=${API_KEY}&alternatives=true`
      );
      // setDirections(response.data);
      console.log(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=transit&key=${API_KEY}&alternatives=true`
      );
      console.log("Routes : ", response.data.routes);
      // console.log(
      //   "Polyline : ",
      //   response.data.routes[0].overview_polyline.points
      // );
      const originToMetroResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${nearestMetroToOrigin.lat},${nearestMetroToOrigin.lng}&key=${API_KEY}&mode=transit&alternatives=true`
      );
      const metroToDestinationResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${nearestMetroToDestination.lat},${nearestMetroToDestination.lng}&destination=${destination}&key=${API_KEY}&mode=transit&alternatives=true`
      );

      const routeDetails = response.data.routes;
      const otmDetails = originToMetroResponse.data.routes;
      console.log(
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOOOOOOOOOOOOOOOOOAAAAAAAAOOOOOOO"
      );
      console.log(originToMetroResponse.data.routes);
      console.log(metroToDestinationResponse.data.routes[0]?.legs);

      const createCombinedRoutes = (
        originToMetroResponseData,
        metroToDestinationResponseData
      ) => {
        const combinedRoutes = [];

        originToMetroResponseData.forEach((originRoute) => {
          metroToDestinationResponseData.forEach((destinationRoute) => {
            const combinedRoute = {
              originToMetroLeg: originRoute,
              metroLeg: {
                fare: {
                  currency: "INR",
                  text: "₹30.00",
                  value: 30,
                },
                legs: [],
                duration: {
                  text: "30 mins",
                  value: 1800,
                },

                summary: "Metro Transport",
                warnings: ["Metro transport - Use caution"],
                waypoint_order: [],
              },
              metroToDestinationLeg: destinationRoute,
            };

            combinedRoutes.push(combinedRoute);
          });
        });

        return combinedRoutes;
      };

      const combinedRoutes = createCombinedRoutes(
        originToMetroResponse.data.routes,
        metroToDestinationResponse.data.routes
      );
      console.log(combinedRoutes);
      console.log("1st part");
      console.log(combinedRoutes[0].originToMetroLeg);
      console.log("2nd part");
      console.log(combinedRoutes[0].metroLeg);
      console.log("3rd part");
      console.log(combinedRoutes[0].metroToDestinationLeg);

      setRoutes({
        nearestMetroToOrigin,
        nearestMetroToDestination,
        routeDetails,
      });

      setPolylineCoordinates(
        polyline
          .decode(response.data.routes[0].overview_polyline.points)
          .map((coord) => {
            return { latitude: coord[0], longitude: coord[1] };
          })
      );

      setMarkers(() => [
        {
          latitude: response.data.routes[0]?.legs[0].start_location.lat,
          longitude: response.data.routes[0]?.legs[0].start_location.lng,
        },
        {
          latitude: response.data.routes[0]?.legs[0].end_location.lat,
          longitude: response.data.routes[0]?.legs[0].end_location.lng,
        },
      ]);
      mapRef.current?.fitToElements();
      console.log("Markers : ", markers);

      // shortestTimeBus = findBusWithShortestTime(routeDetails);
      // shortestDistanceBus = findBusWithShortestDistance(routeDetails);
      // lowestFareBus = findBusWithLowestFare(routeDetails);

      setShortestDistanceBus(() => findBusWithShortestDistance(routeDetails));
      setShortestTimeBus(() => findBusWithShortestTime(routeDetails));
      setLowestFareBus(() => findBusWithLowestFare(routeDetails));

      console.log("Shortest Time Bus:", shortestTimeBus?.legs[0].duration.text);
      console.log(
        "Shortest Distance Bus:",
        shortestDistanceBus?.legs[0].distance.text
      );
      console.log("Lowest Fare Bus:", lowestFareBus?.fare?.value);
    } catch (error) {
      console.error("Error fetching coordinates: ", error);
    }
  };

  const findBusWithShortestTime = (routeDetails) => {
    let shortestTime = Infinity;
    let shortestTimeBus = null;

    for (const route of routeDetails) {
      const durationValue = route?.legs[0].duration?.value;
      if (durationValue < shortestTime) {
        shortestTime = durationValue;
        shortestTimeBus = route;
      }
    }

    return shortestTimeBus;
  };

  const findBusWithShortestDistance = (routeDetails) => {
    let shortestDistance = Infinity;
    let shortestDistanceBus = null;

    for (const route of routeDetails) {
      const distanceValue = route?.legs[0].distance?.value;
      if (distanceValue < shortestDistance) {
        shortestDistance = distanceValue;
        shortestDistanceBus = route;
      }
    }

    return shortestDistanceBus;
  };

  const findBusWithLowestFare = (routeDetails) => {
    let lowestFare = Infinity;
    let lowestFareBus = null;

    for (const route of routeDetails) {
      const fareValue = route?.fare?.value;
      if (fareValue < lowestFare) {
        lowestFare = fareValue;
        lowestFareBus = route;
      }
    }

    return lowestFareBus;
  };

  const sortRoutes = (criteria) => {
    let sortedRoutes = [...routes.routeDetails];

    switch (criteria) {
      case "time":
        sortedRoutes.sort((a, b) => {
          return a?.legs[0].duration?.value - b?.legs[0].duration?.value;
        });
        break;
      case "distance":
        sortedRoutes.sort((a, b) => {
          return a?.legs[0].distance?.value - b?.legs[0].distance?.value;
        });
        break;
      case "fare":
        sortedRoutes.sort((a, b) => {
          return a?.fare?.value - b?.fare?.value;
        });
        break;
      default:
        return;
    }

    setRoutes((prevState) => ({
      ...prevState,
      routeDetails: sortedRoutes,
    }));
    setSelectedSortCriteria(criteria);
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
              styles={{
                textInput: styles.locationInput,
                listView: { position: "absolute", top: 50, zIndex: 2 },
              }}
              onPress={(data, details = null) => {
                setOrigin(data.description);
              }}
              query={{
                key: API_KEY,
                language: "en",
              }}
              currentLocation
            />
            <GooglePlacesAutocomplete
              ref={destinationRef}
              styles={{
                textInput: styles.locationInput,
                listView: { position: "absolute", top: 50, zIndex: 2 },
              }}
              placeholder="Enter Destination"
              onPress={(data, details = null) => {
                console.log("Destination : ", data, details);
                setDestination(data.description);
              }}
              query={{
                key: API_KEY,
                language: "en",
              }}
            />
          </View>

          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            showsUserLocation
            showsMyLocationButton
          >
            {markers.map((marker, index) => (
              <Marker key={`m${index}`} coordinate={marker} />
            ))}
            {routes &&
              routes.routeDetails.map((route) => {
                const coords = polyline
                  .decode(route.overview_polyline.points)
                  .map((coord) => {
                    return { latitude: coord[0], longitude: coord[1] };
                  });

                function generateRandomShade(hexColor) {
                  // Parse the hex color string into RGB components
                  var red = parseInt(hexColor.substring(0, 2), 16);
                  var green = parseInt(hexColor.substring(2, 4), 16);
                  var blue = parseInt(hexColor.substring(4, 6), 16);

                  // Generate random offsets for each RGB component
                  var offsetRed = Math.floor(Math.random() * 51) - 25; // Random number between -25 and 25
                  var offsetGreen = Math.floor(Math.random() * 51) - 25;
                  var offsetBlue = Math.floor(Math.random() * 51) - 25;

                  // Apply the offsets to the RGB components
                  red = Math.min(255, Math.max(0, red + offsetRed));
                  green = Math.min(255, Math.max(0, green + offsetGreen));
                  blue = Math.min(255, Math.max(0, blue + offsetBlue));

                  // Convert the RGB components back to hex
                  var newHexColor =
                    "#" +
                    ((1 << 24) + (red << 16) + (green << 8) + blue)
                      .toString(16)
                      .slice(1);

                  return newHexColor;
                }

                // Example usage:
                var baseColor = "FFC75B";
                var randomShade = generateRandomShade(baseColor);

                return (
                  <Polyline
                    coordinates={coords}
                    strokeColor={randomShade} // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={7}
                  />
                );
              })}
          </MapView>
          <BottomModalContainer buttonTitle="Find Routes">
            {/* <ExploreModal navigation={navigation} /> */}
            <Button title="Find Routes" onPress={getroutes} />
            <RoutesModal
              selectedSortCriteria={selectedSortCriteria}
              sortRoutes={sortRoutes}
              origin={origin}
              destination={destination}
              routes={routes}
              shortestTimeBus={shortestTimeBus}
              shortestDistanceBus={shortestDistanceBus}
              lowestFareBus={lowestFareBus}
              navigation={navigation}
            />
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
    minHeight: 170,
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
});
export default Home;
