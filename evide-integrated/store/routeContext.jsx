import { createContext, useContext, useState, useMemo } from "react";
import { SAMPLE_ROUTE_DATA } from "../data/sampleRouteData";

const RouteContext = createContext(undefined);

/**
 * Provider component for route management
 */
export const RouteProvider = ({ children }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      route: SAMPLE_ROUTE_DATA,
      selectedRoute,
      setSelectedRoute,
    }),
    [selectedRoute]
  );

  return (
    <RouteContext.Provider value={value}>
      {children}
    </RouteContext.Provider>
  );
};

/**
 * Custom hook to use route context
 * @returns {Object} Route context value
 * @throws {Error} If used outside RouteProvider
 */
export const useRoute = () => {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error("useRoute must be used within a RouteProvider");
  }
  return context;
};

// Keep the context export for backward compatibility
export { RouteContext };
