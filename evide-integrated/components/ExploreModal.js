import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

/**
 * ExploreModal component - placeholder for explore functionality
 */
const ExploreModal = () => {
  return (
    <View style={styles.container}>
      <FontAwesome name="rocket" size={48} color="#2675EC" />
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.subtitle}>Coming soon!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
});

export default React.memo(ExploreModal);
