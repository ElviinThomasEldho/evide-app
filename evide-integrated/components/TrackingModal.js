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
import { getDistance } from "geolib";

const TrackingModal = ({ route }) => {
  useEffect(() => {
    // console.log("Route : ", route.legs[0].steps);
  }, []);

  return (
    <>
      {/* <Text>Routes:</Text> */}
      {/* <Button title="Start Journey" onPress={onLog} /> */}
      {route && (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          {route.legs[0].steps.map((step, index) => (
            <>
              <Text key={index + 1} contentWidth={100}>
                {index + 1}.{" "}
                {step.html_instructions && `${step.html_instructions}`}
              </Text>
              {step.travel_mode == "WALKING" &&
                step.steps.map((s) => (
                  <Text contentWidth={100}>
                    <HTML source={{ html: s.html_instructions }} />
                  </Text>
                ))}
              {step.travel_mode == "TRANSIT" && (
                <>
                  <Text>
                    {`${step.transit_details.line.vehicle.type}`}{" "}
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{
                        uri: `https://${step.transit_details.line.vehicle.icon.substring(
                          2
                        )}`,
                      }}
                    />{" "}
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

export default TrackingModal;

const styles = StyleSheet.create({});
