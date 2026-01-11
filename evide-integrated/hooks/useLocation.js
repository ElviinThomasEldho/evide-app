import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { CONFIG } from '../constants/config';
import { mapService } from '../services/mapService';

/**
 * Custom hook for handling location services
 * @param {Object} mapRef - Reference to the MapView component
 * @param {Object} originRef - Reference to the origin input
 * @param {Function} setOrigin - Function to set origin state
 * @returns {Object} Location state and functions
 */
export const useLocation = (mapRef, originRef, setOrigin) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      setIsLoadingLocation(true);
      
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);
      
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);

      // Animate map to current location
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: CONFIG.MAP_DEFAULTS.LATITUDE_DELTA,
          longitudeDelta: CONFIG.MAP_DEFAULTS.LONGITUDE_DELTA,
        });
      }

      // Get address for current location
      try {
        const addressData = await mapService.getCurrentLocationAddress(
          location.coords.latitude,
          location.coords.longitude
        );

        // Set origin input with formatted address
        if (originRef.current && addressData?.formatted_address) {
          originRef.current.setAddressText(addressData.formatted_address);
          setOrigin(addressData.formatted_address);
        }
      } catch (addressError) {
        // Handle address lookup failure gracefully
        // If address lookup fails, use coordinates as fallback
        const fallbackAddress = `${location.coords.latitude.toFixed(6)}, ${location.coords.longitude.toFixed(6)}`;
        
        if (originRef.current) {
          originRef.current.setAddressText(fallbackAddress);
          setOrigin(fallbackAddress);
        }
        
        // Only log if it's not a "no results" error (which is common and expected)
        // Some locations (like middle of ocean, remote areas) don't have addresses
        const isNoResultsError = addressError.code === 'NO_RESULTS' || 
                                 addressError.message?.includes('Could not find address');
        
        if (!isNoResultsError) {
          console.warn('Could not get address for location, using coordinates:', addressError.message);
        }
      }

    } catch (error) {
      console.error('Error getting location:', error);
      // Don't set loading to false if there's a critical error
      // This allows the user to retry
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const getCurrentLocationAddress = async () => {
    if (!currentLocation) return null;
    
    try {
      return await mapService.getCurrentLocationAddress(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
    } catch (error) {
      // Return a fallback object with coordinates if address lookup fails
      const isNoResultsError = error.code === 'NO_RESULTS' || 
                               error.message?.includes('Could not find address');
      
      if (isNoResultsError) {
        // Return coordinates as fallback address
        return {
          formatted_address: `${currentLocation.coords.latitude.toFixed(6)}, ${currentLocation.coords.longitude.toFixed(6)}`,
          geometry: {
            location: {
              lat: currentLocation.coords.latitude,
              lng: currentLocation.coords.longitude,
            },
          },
        };
      }
      console.warn('Error getting current location address:', error.message);
      return null;
    }
  };

  return {
    currentLocation,
    locationPermission,
    isLoadingLocation,
    requestLocationPermission,
    getCurrentLocationAddress,
  };
};

export default useLocation; 