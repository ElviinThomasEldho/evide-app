import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "./UI/Button";

/**
 * RouteModal component - displays detailed route information
 * @param {Object} props - Component props
 * @param {Object} props.route - Route data to display
 */
const RouteModal = ({ route }) => {
  const navigation = useNavigation();

  const handleStartJourney = useCallback(() => {
    navigation.navigate("TrackingScreen", { routeValue: route });
  }, [navigation, route]);

  if (!route) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No route selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Route Details</Text>
      
      <Button
        title="Start Journey"
        onPress={handleStartJourney}
        variant="secondary"
        style={styles.button}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Distance:</Text>
            <Text style={styles.detailValue}>{route?.legs[0].distance?.text}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Time:</Text>
            <Text style={styles.detailValue}>{route?.legs[0].duration?.text}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Cost:</Text>
            <Text style={styles.detailValue}>{route?.fare?.text || "N/A"}</Text>
          </View>
        </View>

        <Text style={styles.stepsTitle}>Steps:</Text>
        {route.legs[0].steps.map((step, index) => (
          <View key={`step-${index}`} style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.stepMode}>{step.travel_mode}</Text>
            </View>
            {step.html_instructions && (
              <Text style={styles.stepInstructions}>
                {step.html_instructions.replace(/<[^>]*>/g, '')}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    marginBottom: 16,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  stepCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2675EC",
  },
  stepMode: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  stepInstructions: {
    fontSize: 14,
    color: "#000",
    lineHeight: 20,
  },
});

export default React.memo(RouteModal);
