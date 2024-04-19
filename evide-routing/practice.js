import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TextInputComponent,
  ScrollView,
} from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import polyline from "@mapbox/polyline";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const App = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState();
  const [routes, setRoutes] = useState();

  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [markers, setMarkers] = useState([]);

  const [polylineCoordinates, setPolylineCoordinates] = useState([]);

  const [shortestTimeBus, setShortestTimeBus] = useState();
  const [shortestDistanceBus, setShortestDistanceBus] = useState();
  const [lowestFareBus, setLowestFareBus] = useState();

  const [selectedSortCriteria, setSelectedSortCriteria] = useState(null);

  const mapRef = useRef();
  const originRef = useRef();
  const destinationRef = useRef();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location : ");
      console.log(currentLocation);

      mapRef.current?.animateToRegion({
        latitude: currentLocation?.coords.latitude,
        longitude: currentLocation?.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      });

      const API_KEY = "AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384";
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&key=${API_KEY}`
      );
      console.log(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&key=${API_KEY}`
      );
      console.log(response.data.results[0].formatted_address);
      originRef.current.setAddressText(
        response.data.results[0].formatted_address
      );
      destinationRef.current.focus();
      setOrigin(response.data.results[0].formatted_address);
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
      const API_KEY = "AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384";

      const originResponse = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: origin,
            key: "AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384",
          },
        }
      );
      const originCoordinates =
        originResponse.data.results[0].geometry.location;

      const destinationResponse = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: destination,
            key: "AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384",
          },
        }
      );
      const destinationCoordinates =
        destinationResponse.data.results[0].geometry.location;

      const nearestMetroToOrigin = findNearestMetroStation(originCoordinates);
      const nearestMetroToDestination = findNearestMetroStation(
        destinationCoordinates
      );

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=transit&key=${API_KEY}&alternatives=true`
      );
      setDirections(response.data);
      console.log("Routes : ", response.data.routes);
      console.log(
        "Polyline : ",
        response.data.routes[0].overview_polyline.points
      );

      const originToMetroResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${routes.nearestMetroToOrigin.lat},${routes.nearestMetroToOrigin.lng}&key=${API_KEY}&mode=transit&alternatives=true`
      );
      const metroToDestinationResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${routes.nearestMetroToDestination.lat},${routes.nearestMetroToDestination.lng}&destination=${destination}&key=${API_KEY}&mode=transit&alternatives=true`
      );

      const routeDetails = response.data.routes;
      const originToMetroResponseRoutes=originToMetroResponse.data;
      const metroToDestinationResponseRoutes=metroToDestinationResponse.data;
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOOOOOOOOOOOOOOOOOAAAAAAAAOOOOOOO");
      console.log(originToMetroResponse.data.routes);
      console.log(metroToDestinationResponse.data.routes);


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
          latitude: response.data.routes[0].legs[0].start_location.lat,
          longitude: response.data.routes[0].legs[0].start_location.lng,
        },
        {
          latitude: response.data.routes[0].legs[0].end_location.lat,
          longitude: response.data.routes[0].legs[0].end_location.lng,
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

      console.log("Shortest Time Bus:", shortestTimeBus.legs[0].duration.text);
      console.log(
        "Shortest Distance Bus:",
        shortestDistanceBus.legs[0].distance.text
      );
      console.log("Lowest Fare Bus:", lowestFareBus.fare.value);
    } catch (error) {
      console.error("Error fetching coordinates: ", error);
    }
  };

  const findBusWithShortestTime = (routeDetails) => {
    let shortestTime = Infinity;
    let shortestTimeBus = null;

    for (const route of routeDetails) {
      const durationValue = route.legs[0].duration.value;
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
      const distanceValue = route.legs[0].distance.value;
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
      const fareValue = route.fare.value;
      if (fareValue < lowestFare) {
        lowestFare = fareValue;
        lowestFareBus = route;
      }
    }

    return lowestFareBus;
  };

  const shortestTimeOption = () => {
    console.log(shortestTimeBus);

    return (
      <View>
        <Text>Route Details for Shortest Time</Text>
        <Text>Start Address: {shortestTimeBus.legs[0].start_address}</Text>
        <Text>End Address: {shortestTimeBus.legs[0].end_address}</Text>
        <Text>Total Distance: {shortestTimeBus.legs[0].distance.text}</Text>
        <Text>Total Time: {shortestTimeBus.legs[0].duration.text}</Text>
        <Text>Total Cost: {shortestTimeBus.fare.text}</Text>
        {shortestTimeBus.legs[0].steps.map((step, index) => (
          <>
            <Text>
              {index}. {step.html_instructions && `${step.html_instructions}`}
              {step.transit_details &&
                ` - No. of Stops: ${step.transit_details.num_stops}`}
            </Text>
          </>
        ))}
      </View>
    );
  };

  const shortestDistanceOption = () => {
    return (
      <View>
        <Text>Route Details for Shortest Distance</Text>
        <Text>Start Address: {shortestDistanceBus.legs[0].start_address}</Text>
        <Text>End Address: {shortestDistanceBus.legs[0].end_address}</Text>
        <Text>Total Distance: {shortestDistanceBus.legs[0].distance.text}</Text>
        <Text>Total Time: {shortestDistanceBus.legs[0].duration.text}</Text>
        <Text>Total Cost: {shortestDistanceBus.fare.text}</Text>
        {shortestDistanceBus.legs[0].steps.map((step, index) => (
          <>
            <Text>
              {index}. {step.html_instructions && `${step.html_instructions}`}
              {step.transit_details &&
                ` - No. of Stops: ${step.transit_details.num_stops}`}
            </Text>
          </>
        ))}
      </View>
    );
  };

  const lowestFareOption = () => {
    return (
      <View>
        <Text>Route Details for Lowest Fare</Text>
        <Text>Start Address: {lowestFareBus.legs[0].start_address}</Text>
        <Text>End Address: {lowestFareBus.legs[0].end_address}</Text>
        <Text>Total Distance: {lowestFareBus.legs[0].distance.text}</Text>
        <Text>Total Time: {lowestFareBus.legs[0].duration.text}</Text>
        <Text>Total Cost: {lowestFareBus.fare.text}</Text>
        {lowestFareBus.legs[0].steps.map((step, index) => (
          <>
            <Text>
              {index}. {step.html_instructions && `${step.html_instructions}`}
              {step.transit_details &&
                ` - No. of Stops: ${step.transit_details.num_stops}`}
            </Text>
          </>
        ))}
      </View>
    );
  };
  const sortRoutes = (criteria) => {
    let sortedRoutes = [...routes.routeDetails];

    switch (criteria) {
      case "time":
        sortedRoutes.sort((a, b) => {
          return a.legs[0].duration.value - b.legs[0].duration.value;
        });
        break;
      case "distance":
        sortedRoutes.sort((a, b) => {
          return a.legs[0].distance.value - b.legs[0].distance.value;
        });
        break;
      case "fare":
        sortedRoutes.sort((a, b) => {
          return a.fare.value - b.fare.value;
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
    <View style={styles.container}>
      <Text>Evide</Text>
      <GooglePlacesAutocomplete
        placeholder="Enter Origin"
        ref={originRef}
        styles={{ textInput: styles.originInput }}
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
        styles={{ textInput: styles.destinationInput }}
        placeholder="Enter Destination"
        onPress={(data, details = null) => {
          setDestination(data.description);
        }}
        query={{
          key: "AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384",
          language: "en",
        }}
      />
      <Button title="Convert" onPress={getroutes} />

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker} />
        ))}
        {routes &&
          routes.routeDetails.map((route) => {
            const coords = polyline
              .decode(route.overview_polyline.points)
              .map((coord) => {
                return { latitude: coord[0], longitude: coord[1] };
              });

            var x = Math.round(0xffffff * Math.random()).toString(16);
            var y = 6 - x.length;
            var z = "000000";
            var z1 = z.substring(0, y);
            var color = "#" + z1 + x;

            return (
              <Polyline
                coordinates={coords}
                strokeColor={color} // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={7}
              />
            );
          })}
      </MapView>

      {routes && (
        <ScrollView>
          <View style={{ marginBottom: 10 }}>
            <Text>Route Details for Shortest Time</Text>
            <Text>Start Address: {shortestTimeBus?.legs[0].start_address}</Text>
            <Text>End Address: {shortestTimeBus?.legs[0].end_address}</Text>
            <Text>
              Total Distance: {shortestTimeBus?.legs[0].distance.text}
            </Text>
            <Text>Total Time: {shortestTimeBus?.legs[0].duration.text}</Text>
            <Text>Total Cost: {shortestTimeBus?.fare.text}</Text>
            {shortestTimeBus?.legs[0].steps.map((step, index) => (
              <>
                <Text>
                  {index}.{" "}
                  {step.html_instructions && `${step.html_instructions}`}
                  {step.transit_details &&
                    ` - No. of Stops: ${step.transit_details.num_stops}`}
                </Text>
              </>
            ))}
          <Text>
            ----------------------------------------------------------------------------------
          </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text>Route Details for Shortest Distance</Text>
            <Text>
              Start Address: {shortestDistanceBus?.legs[0].start_address}
            </Text>
            <Text>End Address: {shortestDistanceBus?.legs[0].end_address}</Text>
            <Text>
              Total Distance: {shortestDistanceBus?.legs[0].distance.text}
            </Text>
            <Text>
              Total Time: {shortestDistanceBus?.legs[0].duration.text}
            </Text>
            <Text>Total Cost: {shortestDistanceBus?.fare.text}</Text>
            {shortestDistanceBus?.legs[0].steps.map((step, index) => (
              <>
                <Text>
                  {index}.{" "}
                  {step.html_instructions && `${step.html_instructions}`}
                  {step.transit_details &&
                    ` - No. of Stops: ${step.transit_details.num_stops}`}
                </Text>
              </>
            ))}
          <Text>
            ----------------------------------------------------------------------------------
          </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text>Route Details for Lowest Fare</Text>
            <Text>Start Address: {lowestFareBus?.legs[0].start_address}</Text>
            <Text>End Address: {lowestFareBus?.legs[0].end_address}</Text>
            <Text>Total Distance: {lowestFareBus?.legs[0].distance.text}</Text>
            <Text>Total Time: {lowestFareBus?.legs[0].duration.text}</Text>
            <Text>Total Cost: {lowestFareBus?.fare.text}</Text>
            {lowestFareBus?.legs[0].steps.map((step, index) => (
              <>
                <Text>
                  {index}.{" "}
                  {step.html_instructions && `${step.html_instructions}`}
                  {step.transit_details &&
                    ` - No. of Stops: ${step.transit_details.num_stops}`}
                </Text>
              </>
            ))}
          </View>
          <Text>
            ----------------------------------------------------------------------------------
          </Text>
          <Text>Origin to Nearest Metro Station:</Text>
          <Text>Origin: {origin}</Text>
          <Text>Nearest Metro Station: {routes.nearestMetroToOrigin.name}</Text>
          <Text>
            -------------------------------------------------------------
          </Text>
          <Text>Nearest Metro Station to Destination:</Text>
          <Text>
            Nearest Metro Station: {routes.nearestMetroToDestination.name}
          </Text>
          <Text>Destination: {destination}</Text>
          <Text>
            -------------------------------------------------------------
          </Text>
          <View style={styles.sortButtons}>
            <Button title="Sort by Time" onPress={() => sortRoutes("time")}
            color={selectedSortCriteria === "time" ? "green" : null} />
            <Button
              title="Sort by Distance"
              onPress={() => sortRoutes("distance")}
              color={selectedSortCriteria === "distance" ? "green" : null}
            />
            <Button title="Sort by Fare" onPress={() => sortRoutes("fare")} 
            color={selectedSortCriteria === "fare" ? "green" : null}/>
          </View>
          <Text>Routes:</Text>
          {routes.routeDetails.map((route, index) => (
            <View key={index}>
              <Text>Route Details {index + 1}:</Text>
              <Text>Start Address: {route?.legs[0].start_address}</Text>
              <Text>End Address: {route?.legs[0].end_address}</Text>
              <Text>Total Distance: {route?.legs[0].distance.text}</Text>
              <Text>Total Time: {route?.legs[0].duration.text}</Text>
              <Text>Total Cost: {route?.fare.text}</Text>
              {route.legs[0].steps.map((step, index) => (
                <>
                  <Text>
                    {index}.{" "}
                    {step.html_instructions && `${step.html_instructions}`}
                    {step.transit_details &&
                      ` - No. of Stops: ${step.transit_details.num_stops}`}
                  </Text>
                </>
              ))}
              <Text>
                -------------------------------------------------------------
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  map: {
    width: "100%",
    height: "50%",
    marginTop: 20,
  },
  originInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  destinationInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  sortButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
});

export default App;
