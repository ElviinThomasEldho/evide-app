import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const RoutesModal = ({routes, selectedSortCriteria, sortRoutes, shortestDistanceBus, shortestTimeBus, lowestFareBus, origin, destination}) => {
  

  return (
    <ScrollView>
      <Text>RoutesModal</Text>
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
    </ScrollView>
  );
};

export default RoutesModal;

const styles = StyleSheet.create({});
