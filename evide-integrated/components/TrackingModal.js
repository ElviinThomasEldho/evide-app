import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
  Linking,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import HTML, { RenderHTML } from "react-native-render-html";
import { getDistance } from "geolib";

const TrackingModal = ({ route, currentStep }) => {
  const { width } = useWindowDimensions();
  const step = route?.legs[0].steps[currentStep];

  useEffect(() => {
    // console.log("Route : ", route?.legs[0].steps);
  }, []);

  return (
    <>
      {/* <Text>Routes:</Text> */}
      {/* <Button title="Start Journey" onPress={onLog} /> */}
      {step && (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          {
            <>
              <Text contentWidth={100}>
                {step.html_instructions && `${step.html_instructions}`}
              </Text>
              {step.steps?.map((s, i) => (
                <RenderHTML
                  key={`ss${i}`}
                  contentWidth={width}
                  source={{ html: s.html_instructions }}
                />
              ))}
              {step.travel_mode == "TRANSIT" && (
                <>
                  <Text>
                    {`${step.transit_details.line.vehicle.type}`}
                    {step.transit_details && (
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={{
                          uri: `https://${step.transit_details.line.vehicle.icon.substring(
                            2
                          )}`,
                        }}
                      />
                    )}
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
          }
        </ScrollView>
      )}
    </>
  );
};

export default TrackingModal;

const styles = StyleSheet.create({});
