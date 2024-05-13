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

  const polyline = require("@mapbox/polyline");

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
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${nearestMetroToOrigin.lat},${nearestMetroToOrigin.lng}&key=${API_KEY}&mode=transit&alternatives=true`
      );
      const metroToDestinationResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${nearestMetroToDestination.lat},${nearestMetroToDestination.lng}&destination=${destination}&key=${API_KEY}&mode=transit&alternatives=true`
      );

      const routeDetails = response.data.routes;
      const stations = {
        Aluva: {
          distance_from_previous_station: "0",
        },
        Pulinchodu: {
          distance_from_previous_station: "1.729",
        },
        Companypady: {
          distance_from_previous_station: "0.969",
        },
        Ambattukavu: {
          distance_from_previous_station: "0.984",
        },
        Muttom: {
          distance_from_previous_station: "0.937",
        },
        Kalamassery: {
          distance_from_previous_station: "2.052",
        },
        "Cochin University": {
          distance_from_previous_station: "1.379",
        },
        Pathadipalam: {
          distance_from_previous_station: "1.247",
        },
        Edapally: {
          distance_from_previous_station: "1.393",
        },
        "Changampuzha Park": {
          distance_from_previous_station: "1.300",
        },
        Palarivatom: {
          distance_from_previous_station: "1.008",
        },
        "J. L. N. Stadium": {
          distance_from_previous_station: "1.121",
        },
        Kaloor: {
          distance_from_previous_station: "1.033",
        },
        "Town Hall": {
          distance_from_previous_station: "0.473",
        },
        "M. G. Road": {
          distance_from_previous_station: "1.203",
        },
        "Maharaja's College": {
          distance_from_previous_station: "1.173",
        },
        "Ernakulam South": {
          distance_from_previous_station: "0.856",
        },
        Kadavanthra: {
          distance_from_previous_station: "1.185",
        },
        Elamkulam: {
          distance_from_previous_station: "1.155",
        },
        Vyttila: {
          distance_from_previous_station: "1.439",
        },
        Thaikoodam: {
          distance_from_previous_station: "1.024",
        },
        Pettah: {
          distance_from_previous_station: "1.183",
        },
      };
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
      function calculateDistanceBetweenStations(station1, station2) {
        let distance = 0;
        let foundStation1 = false;
        let foundStation2 = false;
        let reverseTravel = false;

        // Iterate over each station and accumulate the distances until reaching station1 and station2
        for (const station in stations) {
          if (!foundStation1 && station === station1) {
            foundStation1 = true;
          } else if (!foundStation1 && station === station2) {
            reverseTravel = true;
            foundStation1 = true;
          } else if (foundStation1 && !foundStation2) {
            if (!reverseTravel) {
              distance += stations[station].distance_from_previous_station;
            }
            if (station === station2) {
              foundStation2 = true;
            }
          }
        }

        return foundStation2 ? distance : "Stations are not connected";
      }

      const distanceBetweenStations = calculateDistanceBetweenStations(
        nearestMetroToOrigin.name,
        nearestMetroToDestination.name
      );

      const findCoordsStation = (stationName) => {
        const station = metroStations.find(
          (station) => station.name === stationName
        );
        if (station) {
          return { latitude: station.lat, longitude: station.lng };
        }
      };

      const createCombinedRoutes = (
        originToMetroResponseData,
        metroToDestinationResponseData
      ) => {
        const busAndMetroRoute = [];

        originToMetroResponseData.forEach((originRoute) => {
          metroToDestinationResponseData.forEach((destinationRoute) => {
            const combinedRoute = {
              originToMetroLeg: originRoute,
              metroLeg: {
                startStation: {
                  name: nearestMetroToOrigin.name,
                  latitude: nearestMetroToOrigin.lat,
                  longitude: nearestMetroToOrigin.lng,
                },
                endStation: {
                  name: nearestMetroToDestination.name,
                  latitude: nearestMetroToDestination.lat,
                  longitude: nearestMetroToDestination.lng,
                },
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
                distance: {
                  value: distanceBetweenStations,
                },

                summary: "Metro Transport",
                warnings: ["Metro transport - Use caution"],
                waypoint_order: [],
              },
              metroToDestinationLeg: destinationRoute,
            };

            busAndMetroRoute.push(combinedRoute);
          });
        });

        return busAndMetroRoute;
      };

      const busAndMetroRoute = createCombinedRoutes(
        originToMetroResponse.data.routes,
        metroToDestinationResponse.data.routes
      );
      console.log(busAndMetroRoute);
      console.log("1st part");
      console.log(busAndMetroRoute[0].originToMetroLeg.legs);
      console.log("2nd part");
      console.log(busAndMetroRoute[0].metroLeg);
      console.log("3rd part");
      console.log(busAndMetroRoute[0].metroToDestinationLeg.legs);

      function calculateTotalFareDistanceTimeandCoordinates(busAndMetroRoute) {
        busAndMetroRoute.forEach((route) => {
          const fare1 = route.originToMetroLeg.fare
            ? route.originToMetroLeg.fare.value
            : 0;
          const fare2 = route.metroLeg.fare ? route.metroLeg.fare.value : 0;
          const fare3 = route.metroToDestinationLeg.fare
            ? route.metroToDestinationLeg.fare.value
            : 0;
          const totalFare = fare1 + fare2 + fare3;

          // Add total fare to the existing route object
          route.totalFare = totalFare;

          const time1 = route.originToMetroLeg.legs[0].duration
            ? route.originToMetroLeg.legs[0].duration.value
            : 0;
          const time2 = route.metroLeg.duration
            ? route.metroLeg.duration.value
            : 0;
          const time3 = route.metroToDestinationLeg.legs[0].duration
            ? route.metroToDestinationLeg.legs[0].duration.value
            : 0;
          const totalTime = (time1 + time2 + time3) / 60;

          // Add total fare to the existing route object
          route.totalTime = totalTime;

          const dist1 = route.originToMetroLeg.legs[0].distance
            ? route.originToMetroLeg.legs[0].distance.value
            : 0;
          // const dist2 = route.metroLeg.duration ? route.metroLeg.duration.value : 0;
          const dist3 = route.metroToDestinationLeg.legs[0].distance
            ? route.metroToDestinationLeg.legs[0].distance.value
            : 0;
          const totalDistance = dist1 + dist3;

          // Add total fare to the existing route object
          route.totalDistance = totalDistance;

          const finalPolylineCoords = [];
          finalPolylineCoords.push(
            route.originToMetroLeg.overview_polyline.points
          );
          const metroCoords = [
            [
              route.metroLeg.startStation.latitude,
              route.metroLeg.startStation.longitude,
            ],
            [
              route.metroLeg.endStation.latitude,
              route.metroLeg.endStation.longitude,
            ],
          ];
          const metroEncodedCoords = polyline.encode(metroCoords);
          finalPolylineCoords.push(metroEncodedCoords);
          finalPolylineCoords.push(
            route.metroToDestinationLeg.overview_polyline.points
          );
          route.finalPolylineCoords = finalPolylineCoords;
        });

        return busAndMetroRoute;
      }
      const finalBusandMetroRoutes =
        calculateTotalFareDistanceTimeandCoordinates(busAndMetroRoute);
      console.log(finalBusandMetroRoutes);

      const waterMetroStations = [
        {
          name: "Vypin",
          lat: 10.1581,
          lng: 76.2227,
        },
        {
          name: "Kakkanad",
          lat: 10.0164,
          lng: 76.3646,
        },
        {
          name: "Vytilla",
          lat: 9.9565,
          lng: 76.3157,
        },
        {
          name: "Kochi High Court",
          lat: 9.983774,
          lng: 76.2730021,
        },
      ];

      const waterMetroConnectedness = [
        {
          station1: "Kakkanad",
          station2: "Vytilla",
          fare: 25,
          duration: 30,
          distance: 500,
          fare_text: "₹25.00",
          duration_text: "30 mins",
          lat1: 10.0164,
          lng1: 76.3646,
          lat2: 9.9565,
          lng2: 76.3157,
        },
        {
          station1: "Vytilla",
          station2: "Kakkanad",
          fare: 25,
          duration: 30,
          distance: 500,
          fare_text: "₹25.00",
          duration_text: "30 mins",
          lat1: 9.9565,
          lng1: 76.3157,
          lat2: 10.0164,
          lng2: 76.3646,
        },
        {
          station1: "High Court",
          station2: "Vypeen",
          fare: 30,
          duration: 20,
          distance: 500,
          fare_text: "₹30.00",
          duration_text: "20 mins",
          lat1: 9.983774,
          lng1: 76.2730021,
          lat2: 10.1581,
          lng2: 76.2227,
        },
        {
          station1: "Vypeen",
          station2: "High Court",
          fare: 30,
          duration: 20,
          distance: 500,
          fare_text: "₹25.00",
          duration_text: "20 mins",
          lat1: 10.1581,
          lng1: 76.2227,
          lat2: 9.983774,
          lng2: 76.2730021,
        },
      ];

      const findNearestWaterMetroStation = (coordinates) => {
        const waterMetroStations = [
          {
            name: "Vypeen",
            lat: 10.1581,
            lng: 76.2227,
          },
          {
            name: "Kakkanad",
            lat: 10.0164,
            lng: 76.3646,
          },
          {
            name: "Vytilla",
            lat: 9.9565,
            lng: 76.3157,
          },
          {
            name: "High Court",
            lat: 9.983774,
            lng: 76.2730021,
          },
        ];

        let minDistance = Number.MAX_VALUE;
        let nearestStation = null;
        for (const station of waterMetroStations) {
          const distance = calculateDistance(coordinates, station);
          if (distance < minDistance) {
            minDistance = distance;
            nearestStation = station;
          }
        }
        return nearestStation;
      };

      const nearestWaterMetroToOrigin =
        findNearestWaterMetroStation(originCoordinates);
      const nearestWaterMetroToDestination = findNearestWaterMetroStation(
        destinationCoordinates
      );
      console.log(nearestWaterMetroToOrigin)
      console.log(nearestWaterMetroToDestination)

      const originToWaterMetroResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${nearestWaterMetroToOrigin.lat},${nearestWaterMetroToOrigin.lng}&key=${API_KEY}&mode=transit&alternatives=true`
      );
      const waterMetroToDestinationResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${nearestWaterMetroToDestination.lat},${nearestWaterMetroToDestination.lng}&destination=${destination}&key=${API_KEY}&mode=transit&alternatives=true`
      );

      const originToWaterMetroResponseData =
        originToWaterMetroResponse.data.routes;
      const waterMetroToDestinationResponseData =
        waterMetroToDestinationResponse.data.routes;

      
        const ifConnected = (
          nearestWaterMetroToOrigin,
          nearestWaterMetroToDestination
        ) => {
          for (let i = 0; i < waterMetroConnectedness.length; i++)
            {
              if(waterMetroConnectedness[i].station1 === nearestWaterMetroToOrigin && waterMetroConnectedness[i].station2===nearestWaterMetroToDestination)
              {
                  return i;
                  
              }
            }
            for (let i = 0; i < waterMetroConnectedness.length; i++){
               if (waterMetroConnectedness[i].station1 === nearestWaterMetroToOrigin) 
              {
              const waterMetroStationOrigin1 = waterMetroConnectedness[i].station1;
              const waterMetroStationDestination1 = waterMetroConnectedness[i].station2;
              for (let j = 0; j < waterMetroConnectedness.length; j++) {
                if (
                  waterMetroConnectedness[j].station2 == nearestWaterMetroToDestination
                ) {
                  const waterMetroStationOrigin2 = waterMetroConnectedness[j].station1;
                  const waterMetroStationDestination2 =
                    waterMetroConnectedness[j].station2;
                  const notConnectedWaterMetroOrder = [
                    waterMetroStationOrigin1,
                    waterMetroStationDestination1,
                    waterMetroStationOrigin2,
                    waterMetroStationDestination2,
                  ];
                  return notConnectedWaterMetroOrder;
                }
              }
            }
          }
          return null;
        };

      console.log("printing")
      const notConnectedWaterMetroOrder=ifConnected(nearestWaterMetroToOrigin.name,nearestWaterMetroToDestination.name)
      console.log(notConnectedWaterMetroOrder)
      
        console.log(notConnectedWaterMetroOrder)
        const vales=[]
        for(let i=0;i<waterMetroConnectedness.length;i++)
        {
            if(waterMetroConnectedness[i].station1===notConnectedWaterMetroOrder[0])
            {
              const index=i;
              vales.push(index)
              {
                for(let j=0;j<waterMetroConnectedness.length;j++)
                {
                  if(waterMetroConnectedness[j].station1===notConnectedWaterMetroOrder[2])
                    {
                      const index=j;
                      vales.push(index)
                    }
                }
            }
          }
        }
        console.log(vales)
        const index1=vales[0];
        const index2=vales[1];

        
        if(notConnectedWaterMetroOrder!=0||notConnectedWaterMetroOrder!=1||notConnectedWaterMetroOrder!=2||notConnectedWaterMetroOrder!=3||notConnectedWaterMetroOrder!=4)
        {
        const originToWaterMetro1Response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${waterMetroConnectedness[index1].lat1},${waterMetroConnectedness[index1].lng1}&key=${API_KEY}&mode=transit&alternatives=true`
        );
        const waterMetro1ToWaterMetro2Response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${waterMetroConnectedness[index1].lat2},${waterMetroConnectedness[index1].lng2}&destination=${waterMetroConnectedness[index2].lat1},${waterMetroConnectedness[index2].lng1}&key=${API_KEY}&mode=transit&alternatives=true`
        );
        const waterMetro2ToDestinationResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${waterMetroConnectedness[index2].lat2},${waterMetroConnectedness[index2].lng2}&destination=${destination}&key=${API_KEY}&mode=transit&alternatives=true`
        );

        const originToWaterMetro1ResponseData =
        originToWaterMetro1Response.data.routes;
        const waterMetro1ToWaterMetro2ResponseData =
        waterMetro1ToWaterMetro2Response.data.routes;
        const waterMetro2ToDestinationResponseData =
        waterMetro2ToDestinationResponse.data.routes;}
      

      // console.log("dateils final")
      // console.log(originToWaterMetro1ResponseData)
      // console.log(waterMetro1ToWaterMetro2ResponseData)
      // console.log(waterMetro2ToDestinationResponseData)


      const waterMetroRoutes = () => {
        const id = ifConnected(
          nearestWaterMetroToOrigin.name,
          nearestWaterMetroToDestination.name
        );
        console.log(id)
        if (id==0||id==2||id==3||id==4||id==5||id==1) {
          const busAndWaterMetroRoute = [];
          const id1 = id - 1;
          console.log("inside")
          originToWaterMetroResponseData.forEach((originRoute) => {
            waterMetroToDestinationResponseData.forEach((destinationRoute) => {
              const combinedWaterMetroRoute = {
                originToWaterMetroLeg: originRoute,
                waterMetroLeg: {
                  startStation: {
                    name: nearestWaterMetroToOrigin.name,
                    latitude: nearestWaterMetroToOrigin.lat,
                    longitude: nearestWaterMetroToOrigin.lng,
                  },
                  endStation: {
                    name: nearestWaterMetroToDestination.name,
                    latitude: nearestWaterMetroToDestination.lat,
                    longitude: nearestWaterMetroToDestination.lng,
                  },
                  fare: {
                    currency: "INR",
                    text: waterMetroConnectedness[id].fare_text,
                    value: waterMetroConnectedness[id].fare,
                  },
                  legs: [],
                  duration: {
                    text: waterMetroConnectedness[id].duration_text,
                    value: waterMetroConnectedness[id].duration,
                  },
                  // distance: {
                  //   value: distanceBetweenStations,
                  // },

                  summary: "Water Metro Transport",
                  warnings: ["Water Metro transport - Use caution"],
                  waypoint_order: [],
                },
                waterMetroToDestinationLeg: destinationRoute,
              };

              busAndWaterMetroRoute.push(combinedWaterMetroRoute);
            });
          });

          
          return busAndWaterMetroRoute;
          
        } else if(id.length!=0)
        {
          const busAndWaterMetroRoute = [];  
          originToWaterMetro1ResponseData.forEach((route1) => {
            waterMetro1ToWaterMetro2ResponseData.forEach((route2) => { 
                waterMetroToDestinationResponseData.forEach((route3) => {
                    const combinedWaterMetroRoute = {
                        originToWaterMetro1Leg: route1, 
                        waterMetroLeg1: {
                            startStation: {
                                name: waterMetroConnectedness[index1].station1,
                                latitude:waterMetroConnectedness[index1].lat1,
                                longitude:waterMetroConnectedness[index1].lng1,
                            },
                            endStation: {
                                name: waterMetroConnectedness[index1].station2,
                                latitude: waterMetroConnectedness[index1].lat2,
                                longitude: waterMetroConnectedness[index1].lng2,
                            },
                            fare: {
                                currency: "INR",
                                text: waterMetroConnectedness[index1].fare_text,
                                value: waterMetroConnectedness[index1].fare,
                            },
                            legs: [],
                            duration: {
                                text: waterMetroConnectedness[index1].duration_text,
                                value: waterMetroConnectedness[index1].duration,
                            },
                            summary: "Water Metro Transport",
                            warnings: ["Water Metro transport - Use caution"],
                            waypoint_order: [],
                        },
                        waterMetro1ToWaterMetro2Leg:route2,
                        waterMetroLeg2: {
                          startStation: {
                              name: waterMetroConnectedness[index2].station1,
                              latitude:waterMetroConnectedness[index2].lat1,
                              longitude:waterMetroConnectedness[index2].lng1,
                          },
                          endStation: {
                              name: waterMetroConnectedness[index2].station2,
                              latitude: waterMetroConnectedness[index2].lat2,
                              longitude: waterMetroConnectedness[index2].lng2,
                          },
                          fare: {
                              currency: "INR",
                              text: waterMetroConnectedness[index2].fare_text,
                              value: waterMetroConnectedness[index2].fare,
                          },
                          legs: [],
                          duration: {
                              text: waterMetroConnectedness[index2].duration_text,
                              value: waterMetroConnectedness[index2].duration,
                          },
                          summary: "Water Metro Transport",
                          warnings: ["Water Metro transport - Use caution"],
                          waypoint_order: [],
                      },
                        waterMetroToDestinationLeg: route3,
                    };
        
                    busAndWaterMetroRoute.push(combinedWaterMetroRoute);
                });
            });
        });
        
        return busAndWaterMetroRoute;
        
      }
      else{
        return null;
      }
    };

      console.log("hi");

      const combinedWaterAndBusRoute = waterMetroRoutes();
      console.log(combinedWaterAndBusRoute[0]);

      function calculateTotalFareDistanceTimeandCoordinatesWaterMetro(
        combinedWaterAndBusRoute
      ) {
        combinedWaterAndBusRoute.forEach((route) => {
          const fare1 = route.originToWaterMetroLeg?.fare
            ? route.originToWaterMetroLeg?.fare.value
            : 0;
          const fare2 = route.waterMetroLeg?.fare
            ? route.waterMetroLeg.fare.value
            : 0;
          const fare3 = route.waterMetroToDestinationLeg?.fare
            ? route.waterMetroToDestinationLeg?.fare.value
            : 0;
          const totalFare = fare1 + fare2 + fare3;

          // Add total fare to the existing route object
          route.totalFare = totalFare;

          const time1 = route.originToWaterMetroLeg?.legs[0].duration
            ? route.originToWaterMetroLeg?.legs[0].duration.value
            : 0;
          const time2 = route.waterMetroLeg?.duration
            ? route.waterMetroLeg?.duration.value
            : 0;
          const time3 = route.waterMetroToDestinationLeg?.legs[0].duration
            ? route.waterMetroToDestinationLeg?.legs[0].duration.value
            : 0;
          const totalTime = (time1 + time2 + time3) / 60;

          // Add total fare to the existing route object
          route.totalTime = totalTime;

          const dist1 = route.originToWaterMetroLeg.legs[0].distance
            ? route.originToWaterMetroLeg.legs[0].distance.value
            : 0;
          // const dist2 = route.metroLeg.duration ? route.metroLeg.duration.value : 0;
          const dist3 = route.waterMetroToDestinationLeg.legs[0].distance
            ? route.waterMetroToDestinationLeg.legs[0].distance.value
            : 0;
          const totalDistance = dist1 + dist3;

          // Add total fare to the existing route object
          route.totalDistance = totalDistance;

          const finalPolylineCoords = [];
          finalPolylineCoords.push(
            route.originToWaterMetroLeg.overview_polyline.points
          );
          const waterMetroCoords = [
            [
              route.waterMetroLeg.startStation.latitude,
              route.waterMetroLeg.startStation.longitude,
            ],
            [
              route.waterMetroLeg.endStation.latitude,
              route.waterMetroLeg.endStation.longitude,
            ],
          ];
          const waterMetroEncodedCoords = polyline.encode(waterMetroCoords);
          finalPolylineCoords.push(waterMetroEncodedCoords);
          finalPolylineCoords.push(
            route.waterMetroToDestinationLeg.overview_polyline.points
          );
          route.finalPolylineCoords = finalPolylineCoords;
        });

        return combinedWaterAndBusRoute;
      }
      const finalBusandWaterMetroRoute =
        calculateTotalFareDistanceTimeandCoordinatesWaterMetro(
          combinedWaterAndBusRoute
        );
      console.log(finalBusandWaterMetroRoute[0]);

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

      console.log("Shortest Time Bus:", shortestTimeBus.legs[0].duration?.text);
      console.log(
        "Shortest Distance Bus:",
        shortestDistanceBus.legs[0].distance?.text
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
        <Text>Total Distance: {shortestTimeBus.legs[0].distance?.text}</Text>
        <Text>Total Time: {shortestTimeBus.legs[0].duration?.text}</Text>
        <Text>Total Cost: {shortestTimeBus.fare?.text}</Text>
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
        <Text>
          Total Distance: {shortestDistanceBus.legs[0].distance?.text}
        </Text>
        <Text>Total Time: {shortestDistanceBus.legs[0].duration?.text}</Text>
        <Text>Total Cost: {shortestDistanceBus.fare?.text}</Text>
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
        <Text>Total Distance: {lowestFareBus.legs[0].distance?.text}</Text>
        <Text>Total Time: {lowestFareBus.legs[0].duration?.text}</Text>
        <Text>Total Cost: {lowestFareBus.fare?.text}</Text>
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
              Total Distance: {shortestTimeBus?.legs[0].distance?.text}
            </Text>
            <Text>Total Time: {shortestTimeBus?.legs[0].duration?.text}</Text>
            <Text>Total Cost: {shortestTimeBus?.fare?.text}</Text>
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
              Total Distance: {shortestDistanceBus?.legs[0].distance?.text}
            </Text>
            <Text>
              Total Time: {shortestDistanceBus?.legs[0].duration?.text}
            </Text>
            <Text>Total Cost: {shortestDistanceBus?.fare?.text}</Text>
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
            <Text>Total Distance: {lowestFareBus?.legs[0].distance?.text}</Text>
            <Text>Total Time: {lowestFareBus?.legs[0].duration?.text}</Text>
            <Text>Total Cost: {lowestFareBus?.fare?.text}</Text>
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
            <Button
              title="Sort by Time"
              onPress={() => sortRoutes("time")}
              color={selectedSortCriteria === "time" ? "green" : null}
            />
            <Button
              title="Sort by Distance"
              onPress={() => sortRoutes("distance")}
              color={selectedSortCriteria === "distance" ? "green" : null}
            />
            <Button
              title="Sort by Fare"
              onPress={() => sortRoutes("fare")}
              color={selectedSortCriteria === "fare" ? "green" : null}
            />
          </View>
          <Text>Routes:</Text>
          {routes.routeDetails.map((route, index) => (
            <View key={index}>
              <Text>Route Details {index + 1}:</Text>
              <Text>Start Address: {route?.legs[0].start_address}</Text>
              <Text>End Address: {route?.legs[0].end_address}</Text>
              <Text>Total Distance: {route?.legs[0].distance?.text}</Text>
              <Text>Total Time: {route?.legs[0].duration?.text}</Text>
              <Text>Total Cost: {route?.fare?.text}</Text>
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
