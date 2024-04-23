import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const RoutesModal = ({
  routes,
  selectedSortCriteria,
  sortRoutes,
  shortestDistanceBus,
  shortestTimeBus,
  lowestFareBus,
  origin,
  destination,
}) => {
  return (
    <>
      <Text>Routes:</Text>
      {routes && (
        <ScrollView>
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
          {routes.routeDetails.map((route, index) => (
            <TouchableOpacity key={index}>
              <Text>Route Details {index + 1}:</Text>
              {/* <Text>Start Address: {route?.legs[0].start_address}</Text>
              <Text>End Address: {route?.legs[0].end_address}</Text> */}
              <Text>Total Distance: {route?.legs[0].distance?.text}</Text>
              <Text>Total Time: {route?.legs[0].duration?.text}</Text>
              <Text>Total Cost: {route?.fare?.text}</Text>
              {/* {route.legs[0].steps.map((step, index) => (
                <>
                  <Text>
                    {index}.{" "}
                    {step.html_instructions && `${step.html_instructions}`}
                    {step.transit_details &&
                      ` - No. of Stops: ${step.transit_details.num_stops}`}
                  </Text>
                </>
              ))} */}
              <Text>
                -------------------------------------------------------------
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default RoutesModal;

const styles = StyleSheet.create({});
