import "react-native-get-random-values"; // Must be imported before any other imports that use crypto
import "react-native-gesture-handler";

// Import mapService early to register axios interceptors before any API calls
import "./services/mapService";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";

// Screen imports
import Home from "./screens/Home.js";
import LanguageScreen from "./screens/LanguageScreen.js";
import RouteDetailScreen from "./screens/RouteDetailScreen.js";
import TrackingScreen from "./screens/TrackingScreen.js";

// Context imports
import { LanguageProvider } from "./context/LanguageContext";
import { RouteProvider } from "./store/routeContext.jsx";

// Error handling
import ErrorBoundary from "./components/ErrorBoundary";

const Drawer = createDrawerNavigator();

/**
 * Navigation content component
 * Separated to ensure hooks are called within providers
 */
function AppContent() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: { backgroundColor: "#FFC75B" },
          drawerActiveTintColor: "#2675EC",
          drawerInactiveTintColor: "#000",
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={Home}
          options={{ title: t("home") }}
        />
        <Drawer.Screen 
          name="TrackingScreen" 
          component={TrackingScreen}
          options={{ title: t("tracking") || "Tracking" }}
        />
        <Drawer.Screen 
          name="RouteDetailScreen" 
          component={RouteDetailScreen}
          options={{ title: t("routeDetails") || "Route Details" }}
        />
        <Drawer.Screen 
          name="LanguageScreen" 
          component={LanguageScreen}
          options={{ title: t("changeLanguage") || "Change Language" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

/**
 * Root App component with all providers
 */
export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <RouteProvider>
          <AppContent />
        </RouteProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
