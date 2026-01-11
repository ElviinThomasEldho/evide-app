import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import Button from "../components/UI/Button";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BottomModalContainer from "../components/BottomModalContainer";
import SafeGooglePlacesAutocomplete from "../components/SafeGooglePlacesAutocomplete";
import ProfileIcon from "../components/ProfileIcon";
import RoutesModal from "../components/RoutesModal";

// Import constants and utilities
import { CONFIG } from "../constants/config";
import { METRO_STATIONS } from "../constants/metroStations";
import { findNearestStation } from "../utils/distanceCalculator";
import { 
  findRouteWithShortestTime, 
  findRouteWithShortestDistance, 
  findRouteWithLowestFare,
  sortRoutes,
  generateRandomShade
} from "../utils/routeUtils";

// Import services and hooks
import { mapService, MapServiceError } from "../services/mapService";
import { useLocation } from "../hooks/useLocation";

const Home = ({ navigation }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState();
  const [markers, setMarkers] = useState([]);
  const [shortestTimeBus, setShortestTimeBus] = useState();
  const [shortestDistanceBus, setShortestDistanceBus] = useState();
  const [lowestFareBus, setLowestFareBus] = useState();
  const [selectedSortCriteria, setSelectedSortCriteria] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = CONFIG.GOOGLE_MAPS_API_KEY;

  const mapRef = useRef();
  const originRef = useRef();
  const destinationRef = useRef();

  // Use custom location hook
  const { currentLocation, isLoadingLocation } = useLocation(mapRef, originRef, setOrigin);

  useEffect(() => {
    if (currentLocation && destinationRef.current) {
      destinationRef.current.focus();
    }
  }, [currentLocation]);

  // Function to find nearest metro station
  const findNearestMetroStation = (coordinates) => {
    return findNearestStation(coordinates, METRO_STATIONS);
  };

  const getroutes = async () => {
    // Reset error state
    setError(null);
    setIsLoading(true);

    // Validate inputs
    if (!origin.trim() || !destination.trim()) {
      setError("Please enter both origin and destination");
      setIsLoading(false);
      return;
    }

    try {
      // Use the map service for cleaner API calls
      const originCoordinates = await mapService.getCoordinatesFromAddress(origin);
      const destinationCoordinates = await mapService.getCoordinatesFromAddress(destination);

      const nearestMetroToOrigin = findNearestMetroStation(originCoordinates);
      const nearestMetroToDestination = findNearestMetroStation(
        destinationCoordinates
      );

      // Get main route directions
      const directionsData = await mapService.getDirections(origin, destination);

      // Get metro route directions
      const originToMetroData = await mapService.getDirectionsToMetro(origin, nearestMetroToOrigin);
      const metroToDestinationData = await mapService.getDirectionsFromMetro(nearestMetroToDestination, destination);

      const routeDetails = directionsData.routes;

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

      setRoutes({
        nearestMetroToOrigin,
        nearestMetroToDestination,
        routeDetails,
      });

      // Handle polyline and markers
      if (directionsData.routes[0]) {
        setMarkers([
          {
            latitude: directionsData.routes[0].legs[0].start_location.lat,
            longitude: directionsData.routes[0].legs[0].start_location.lng,
          },
          {
            latitude: directionsData.routes[0].legs[0].end_location.lat,
            longitude: directionsData.routes[0].legs[0].end_location.lng,
          },
        ]);
      }
      mapRef.current?.fitToElements();

      setShortestDistanceBus(() => findBusWithShortestDistance(routeDetails));
      setShortestTimeBus(() => findBusWithShortestTime(routeDetails));
      setLowestFareBus(() => findBusWithLowestFare(routeDetails));
    } catch (error) {
      // Handle MapServiceError with user-friendly messages
      if (error instanceof MapServiceError) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
        console.error("Error fetching routes: ", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // These functions are now handled by imported utilities
  const findBusWithShortestTime = (routeDetails) => {
    return findRouteWithShortestTime(routeDetails);
  };

  const findBusWithShortestDistance = (routeDetails) => {
    return findRouteWithShortestDistance(routeDetails);
  };

  const findBusWithLowestFare = (routeDetails) => {
    return findRouteWithLowestFare(routeDetails);
  };

  const handleSortRoutes = useCallback((criteria) => {
    const sortedRoutes = sortRoutes(routes.routeDetails, criteria);
    setRoutes((prevState) => ({
      ...prevState,
      routeDetails: sortedRoutes,
    }));
    setSelectedSortCriteria(criteria);
  }, [routes]);

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
            {API_KEY && (
              <SafeGooglePlacesAutocomplete
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
                enablePoweredByContainer={false}
                debounce={400}
                minLength={2}
                fetchDetails={true}
                listViewDisplayed="auto"
                suppressDefaultStyles={false}
                predefinedPlaces={[]}
                predefinedPlacesAlwaysVisible={false}
                textInputProps={{
                  onChangeText: (text) => {
                    setOrigin(text);
                  },
                }}
                onFail={(error) => console.error('GooglePlacesAutocomplete Error:', error)}
                onNotFound={() => console.log('No results found')}
                keepResultsAfterBlur={true}
              />
            )}
            {API_KEY && (
              <SafeGooglePlacesAutocomplete
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
                enablePoweredByContainer={false}
                debounce={400}
                minLength={2}
                fetchDetails={true}
                listViewDisplayed="auto"
                suppressDefaultStyles={false}
                predefinedPlaces={[]}
                predefinedPlacesAlwaysVisible={false}
                textInputProps={{
                  onChangeText: (text) => {
                    setDestination(text);
                  },
                }}
                onFail={(error) => console.error('GooglePlacesAutocomplete Error:', error)}
                onNotFound={() => console.log('No results found')}
                keepResultsAfterBlur={true}
              />
            )}
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

                // Example usage:
                const baseColor = "#FFC75B";
                const randomShade = generateRandomShade(baseColor);

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
            {/* Error Display */}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => setError(null)} style={styles.errorDismiss}>
                  <Text style={styles.errorDismissText}>Dismiss</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFC75B" />
                <Text style={styles.loadingText}>Finding routes...</Text>
              </View>
            )}

            {/* Find Routes Button */}
            <Button 
              title="Find Routes"
              onPress={getroutes}
              disabled={isLoading || !origin.trim() || !destination.trim()}
              loading={isLoading}
              variant="primary"
            />
            <RoutesModal
              selectedSortCriteria={selectedSortCriteria}
              sortRoutes={handleSortRoutes}
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
    width: "100%",
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
    position: "absolute",
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
  errorContainer: {
    backgroundColor: "#ffebee",
    borderColor: "#d32f2f",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
    marginBottom: 8,
  },
  errorDismiss: {
    alignSelf: "flex-end",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  errorDismissText: {
    color: "#d32f2f",
    fontSize: 12,
    fontWeight: "600",
  },
  loadingContainer: {
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});

export default React.memo(Home);
