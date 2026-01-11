import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "./UI/Button";

/**
 * Modal component for displaying route options
 * @param {Object} props - Component props
 * @param {Object} props.routes - Available routes
 * @param {string} props.selectedSortCriteria - Currently selected sort criteria
 * @param {Function} props.sortRoutes - Function to sort routes
 */
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
  const navigation = useNavigation();

  const handleRoutePress = useCallback((route) => {
    navigation.navigate("RouteDetailScreen", { routeValue: route });
  }, [navigation]);

  const handleSortPress = useCallback((criteria) => {
    sortRoutes(criteria);
  }, [sortRoutes]);

  if (!routes) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No routes available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Routes</Text>
      
      <View style={styles.sortButtons}>
        <Button
          title="Time"
          onPress={() => handleSortPress("time")}
          variant={selectedSortCriteria === "time" ? "primary" : "outline"}
          style={styles.sortButton}
        />
        <Button
          title="Distance"
          onPress={() => handleSortPress("distance")}
          variant={selectedSortCriteria === "distance" ? "primary" : "outline"}
          style={styles.sortButton}
        />
        <Button
          title="Fare"
          onPress={() => handleSortPress("fare")}
          variant={selectedSortCriteria === "fare" ? "primary" : "outline"}
          style={styles.sortButton}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {routes.routeDetails.map((route, index) => (
          <TouchableOpacity
            key={`route-${index}`}
            style={styles.routeCard}
            onPress={() => handleRoutePress(route)}
            activeOpacity={0.7}
          >
            <View style={styles.routeHeader}>
              <Text style={styles.routeTitle}>Route {index + 1}</Text>
              {selectedSortCriteria === "time" && shortestTimeBus?.summary === route.summary && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Fastest</Text>
                </View>
              )}
              {selectedSortCriteria === "distance" && shortestDistanceBus?.summary === route.summary && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Shortest</Text>
                </View>
              )}
              {selectedSortCriteria === "fare" && lowestFareBus?.summary === route.summary && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Cheapest</Text>
                </View>
              )}
            </View>
            
            <View style={styles.routeDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Distance:</Text>
                <Text style={styles.detailValue}>{route?.legs[0].distance?.text}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Duration:</Text>
                <Text style={styles.detailValue}>{route?.legs[0].duration?.text}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Fare:</Text>
                <Text style={styles.detailValue}>{route?.fare?.text || "N/A"}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  sortButtons: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 8,
    minHeight: 40,
  },
  routeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  badge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  routeDetails: {
    gap: 8,
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
});

export default React.memo(RoutesModal);
