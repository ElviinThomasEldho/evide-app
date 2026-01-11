import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import { RenderHTML } from "react-native-render-html";

/**
 * TrackingModal component - displays current step tracking information
 * @param {Object} props - Component props
 * @param {Object} props.route - Route data
 * @param {number} props.currentStep - Current step index
 */
const TrackingModal = ({ route, currentStep }) => {
  const { width } = useWindowDimensions();
  const step = route?.legs[0].steps[currentStep];

  if (!step) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No step information available</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.stepNumber}>Step {currentStep + 1}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{step.travel_mode}</Text>
          </View>
        </View>

        {step.html_instructions && (
          <Text style={styles.instructions}>
            {step.html_instructions.replace(/<[^>]*>/g, '')}
          </Text>
        )}

        {step.steps?.map((s, i) => (
          <RenderHTML
            key={`substep-${i}`}
            contentWidth={width - 64}
            source={{ html: s.html_instructions }}
            baseStyle={styles.subStepText}
          />
        ))}

        {step.travel_mode === "TRANSIT" && step.transit_details && (
          <View style={styles.transitDetails}>
            <View style={styles.transitHeader}>
              <Text style={styles.transitType}>
                {step.transit_details.line.vehicle.type}
              </Text>
              {step.transit_details.line.vehicle.icon && (
                <Image
                  style={styles.transitIcon}
                  source={{
                    uri: `https://${step.transit_details.line.vehicle.icon.substring(2)}`,
                  }}
                />
              )}
            </View>

            <Text style={styles.transitLine}>
              Line: {step.transit_details.line.name}
            </Text>
            <Text style={styles.transitStops}>
              Stops: {step.transit_details.num_stops}
            </Text>

            <View style={styles.transitStop}>
              <Text style={styles.transitStopLabel}>Departure:</Text>
              <Text style={styles.transitStopValue}>
                {step.transit_details.departure_stop.name}
              </Text>
              <Text style={styles.transitStopTime}>
                {step.transit_details.departure_time.text}
              </Text>
            </View>

            <View style={styles.transitStop}>
              <Text style={styles.transitStopLabel}>Arrival:</Text>
              <Text style={styles.transitStopValue}>
                {step.transit_details.arrival_stop.name}
              </Text>
              <Text style={styles.transitStopTime}>
                {step.transit_details.arrival_time.text}
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  badge: {
    backgroundColor: "#2675EC",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  instructions: {
    fontSize: 16,
    color: "#000",
    lineHeight: 24,
    marginBottom: 12,
  },
  subStepText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  transitDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  transitHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  transitType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  transitIcon: {
    width: 24,
    height: 24,
  },
  transitLine: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  transitStops: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  transitStop: {
    marginBottom: 8,
  },
  transitStopLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  transitStopValue: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  transitStopTime: {
    fontSize: 12,
    color: "#666",
  },
});

export default React.memo(TrackingModal);
