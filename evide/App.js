import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";

const App = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originLatLng, setOriginLatLng] = useState(null);
  const [destinationLatLng, setDestinationLatLng] = useState(null);
  const [routes, setroutes] = useState([]);

  // const getLatLng = async (place, setLatLng) => {
  //   try {
  //     const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
  //       params: {
  //         address: place,
  //         key: 'AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384',
  //       },
  //     });

  //     const { results } = response.data;
  //     if (results && results.length > 0) {
  //       const { lat, lng } = results[0].geometry.location;
  //       setLatLng({ latitude: lat, longitude: lng });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching coordinates: ', error);
  //   }
  // };

  // const handleConvert = () => {
  //   getLatLng(origin, setOriginLatLng);
  //   getLatLng(destination, setDestinationLatLng);
  // };

  const getroutes = async () => {
    try {
      const API_KEY = "AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384";
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`
      );
      
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching coordinates: ", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Origin"
        value={origin}
        onChangeText={(text) => {
          setOrigin(text);
        }}
      />
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Destination"
        value={destination}
        onChangeText={(text) => setDestination(text)}
      />
      <Button title="Convert" onPress={getroutes} />
    </View>
  );
};

export default App;
