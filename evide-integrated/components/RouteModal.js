import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import HTML from "react-native-render-html";

import { useNavigation } from "@react-navigation/native";

const RouteModal = ({ route }) => {
  const navigation = useNavigation();

  useEffect(() => {
    // console.log("Route : ", route.legs[0].steps);
  }, []);

  const onLog = () => {
    route.legs[0].steps.forEach((step, index) => {
      console.log(`Step ${index} : `, step.start_location, step.end_location);
      console.log(`Transit ${index} : `, step.transit_details);
    });
  };

  return (
    <>
      <Text>Routes:</Text>
      <Button
        title="Start Journey"
        onPress={() => {
          navigation.navigate("TrackingScreen", { routeValue: route });
        }}
      />
      {route && (
        <ScrollView>
          <Text>Route Details :</Text>
          {/* <Text>Start Address: {route?.legs[0].start_address}</Text>
              <Text>End Address: {route?.legs[0].end_address}</Text> */}
          <Text>Total Distance: {route?.legs[0].distance?.text}</Text>
          <Text>Total Time: {route?.legs[0].duration?.text}</Text>
          <Text>Total Cost: {route?.fare?.text}</Text>
          {route.legs[0].steps.map((step, index) => (
            <>
              <Text key={`s${index}`}>
                {index}. {step.html_instructions && `${step.html_instructions}`}
              </Text>
              {step.travel_mode == "WALKING" &&
                step.steps.map((s) => (
                  <View style={{ flexDirection: "column" }}>
                    <Text>-</Text>
                    <HTML source={{ html: s.html_instructions }} />
                  </View>
                ))}
              {step.travel_mode == "TRANSIT" && (
                <>
                  <Text>
                    {`${step.transit_details.line.vehicle.type}`}{" "}
                    {step.transit_details && (
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={{
                          uri: `https://${step.transit_details.line.vehicle.icon.substring(
                            2
                          )}`,
                        }}
                      />
                    )}{" "}
                    (Stops : {`${step.transit_details.num_stops}`})
                  </Text>
                  <Text>{`Name : ${step.transit_details.line.name}`}</Text>

                  <Text>
                    {`Departure Stop : ${step.transit_details.departure_stop.name} | ${step.transit_details.departure_time.text}`}
                  </Text>
                  <Text>
                    {`Arrival Stop : ${step.transit_details.arrival_stop.name} | ${step.transit_details.arrival_time.text}`}
                  </Text>
                </>
              )}
            </>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default RouteModal;

const styles = StyleSheet.create({});
