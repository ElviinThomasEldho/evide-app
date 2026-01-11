import Constants from 'expo-constants';

// Configuration constants
export const CONFIG = {
  // Google Maps API key - loaded from environment variables
  // Set GOOGLE_MAPS_API_KEY in .env file or app.json extra config
  GOOGLE_MAPS_API_KEY: Constants.expoConfig?.extra?.googleMapsApiKey || 
                        process.env.GOOGLE_MAPS_API_KEY || 
                        'AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384', // Fallback for development
  
  // Map configuration
  MAP_DEFAULTS: {
    LATITUDE_DELTA: 0.009,
    LONGITUDE_DELTA: 0.009,
  },
  
  // Modal snap points
  MODAL_SNAP_POINTS: ['25%', '40%', '75%'],
  
  // Earth radius for distance calculations (in meters)
  EARTH_RADIUS_METERS: 6371e3,
  
  // Transit modes
  TRANSIT_MODES: {
    WALKING: 'WALKING',
    TRANSIT: 'TRANSIT',
    BUS: 'BUS',
  },
  
  // Currency
  CURRENCY: {
    INR: 'INR',
  },
  
  // Time zones
  TIME_ZONES: {
    ASIA_CALCUTTA: 'Asia/Calcutta',
  },
  
  // API endpoints
  GOOGLE_MAPS_API: {
    GEOCODE: 'https://maps.googleapis.com/maps/api/geocode/json',
    DIRECTIONS: 'https://maps.googleapis.com/maps/api/directions/json',
  }
};

export default CONFIG; 