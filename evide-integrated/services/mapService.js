import axios from 'axios';
import { CONFIG } from '../constants/config';

// Configure axios defaults for React Native compatibility
axios.defaults.timeout = 30000; // 30 seconds
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.responseType = 'json';

// Ensure all axios requests have proper config for React Native
axios.interceptors.request.use(
  (config) => {
    // Create a clean config object with all required parameters
    // React Native's native sendRequest expects specific argument types
    
    // 1. Ensure timeout is always a valid number
    const timeout = Number(config.timeout);
    if (!timeout || isNaN(timeout) || timeout <= 0) {
      config.timeout = 30000;
    } else {
      config.timeout = timeout;
    }
    
    // 2. Ensure all params are strings and not undefined
    if (config.params) {
      const cleanedParams = {};
      for (const [key, value] of Object.entries(config.params)) {
        if (value !== undefined && value !== null) {
          cleanedParams[key] = String(value).trim();
        }
      }
      config.params = cleanedParams;
    } else {
      config.params = {};
    }
    
    // 3. Ensure URL is a string
    if (config.url) {
      config.url = String(config.url);
    }
    
    // 4. Ensure method is a string
    if (!config.method) {
      config.method = 'GET';
    }
    config.method = String(config.method).toUpperCase();
    
    // 5. Ensure headers object exists and is properly formatted
    if (!config.headers) {
      config.headers = {};
    }
    
    // 6. Ensure responseType is set
    if (!config.responseType) {
      config.responseType = 'json';
    }
    
    // 7. Set withCredentials explicitly (React Native may need this)
    if (config.withCredentials === undefined) {
      config.withCredentials = false;
    }
    
    // 8. Ensure data is properly formatted
    if (config.data === undefined) {
      config.data = null;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Custom error class for API errors
 */
export class MapServiceError extends Error {
  constructor(message, code, originalError) {
    super(message);
    this.name = 'MapServiceError';
    this.code = code;
    this.originalError = originalError;
  }
}

/**
 * Service for handling Google Maps API calls
 */
class MapService {
  constructor() {
    this.apiKey = CONFIG.GOOGLE_MAPS_API_KEY;
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
  }

  /**
   * Retry logic for failed API calls
   * @param {Function} fn - Function to retry
   * @param {number} retries - Number of retries remaining
   * @returns {Promise} Result of the function
   */
  async retry(fn, retries = this.maxRetries) {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0 && this.isRetryableError(error)) {
        await this.delay(this.retryDelay);
        return this.retry(fn, retries - 1);
      }
      throw error;
    }
  }

  /**
   * Check if error is retryable (network errors, 5xx errors)
   */
  isRetryableError(error) {
    if (!error.response) {
      // Network error - retryable
      return true;
    }
    const status = error.response.status;
    // Retry on server errors (5xx) and rate limiting (429)
    return status >= 500 || status === 429;
  }

  /**
   * Delay helper for retries
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Parse and format API errors into user-friendly messages
   */
  getErrorMessage(error) {
    if (!error.response) {
      return 'Network error. Please check your internet connection.';
    }

    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return data?.error_message || 'Invalid request. Please check your input.';
      case 403:
        return 'API key is invalid or has insufficient permissions.';
      case 404:
        return 'Location not found. Please try a different address.';
      case 429:
        return 'Too many requests. Please try again in a moment.';
      case 500:
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return data?.error_message || 'An unexpected error occurred. Please try again.';
    }
  }

  /**
   * Get coordinates from an address using Google Geocoding API
   * @param {string} address - The address to geocode
   * @returns {Promise<Object>} Coordinates object with lat and lng
   * @throws {MapServiceError} If geocoding fails
   */
  async getCoordinatesFromAddress(address) {
    if (!address || address.trim() === '') {
      throw new MapServiceError('Address is required', 'INVALID_INPUT');
    }

    if (!this.apiKey) {
      throw new MapServiceError('Google Maps API key is not configured', 'MISSING_API_KEY');
    }

    try {
      const response = await this.retry(() =>
        axios.get(CONFIG.GOOGLE_MAPS_API.GEOCODE, {
          params: {
            address: String(address).trim(),
            key: String(this.apiKey),
          },
          timeout: 30000, // 30 second timeout
        })
      );

      if (!response.data.results || response.data.results.length === 0) {
        throw new MapServiceError(
          'No results found for this address',
          'NO_RESULTS',
          null
        );
      }

      return response.data.results[0]?.geometry.location;
    } catch (error) {
      if (error instanceof MapServiceError) {
        throw error;
      }
      const message = this.getErrorMessage(error);
      throw new MapServiceError(message, error.response?.status || 'UNKNOWN', error);
    }
  }

  /**
   * Get current location coordinates and address
   * @param {number} latitude - Current latitude
   * @param {number} longitude - Current longitude
   * @returns {Promise<Object>} Address information
   * @throws {MapServiceError} If reverse geocoding fails
   */
  async getCurrentLocationAddress(latitude, longitude) {
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      throw new MapServiceError('Invalid coordinates', 'INVALID_INPUT');
    }

    if (!this.apiKey) {
      throw new MapServiceError('Google Maps API key is not configured', 'MISSING_API_KEY');
    }

    // Validate coordinates are within valid ranges
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      throw new MapServiceError('Coordinates out of valid range', 'INVALID_INPUT');
    }

    try {
      const response = await this.retry(() =>
        axios.get(CONFIG.GOOGLE_MAPS_API.GEOCODE, {
          params: {
            latlng: `${latitude},${longitude}`,
            key: String(this.apiKey),
          },
          timeout: 30000, // 30 second timeout
        })
      );

      if (!response.data.results || response.data.results.length === 0) {
        throw new MapServiceError(
          'Could not find address for this location',
          'NO_RESULTS',
          null
        );
      }

      return response.data.results[0];
    } catch (error) {
      if (error instanceof MapServiceError) {
        throw error;
      }
      const message = this.getErrorMessage(error);
      throw new MapServiceError(message, error.response?.status || 'UNKNOWN', error);
    }
  }

  /**
   * Get directions between two points
   * @param {string} origin - Origin address or coordinates
   * @param {string} destination - Destination address or coordinates
   * @param {string} mode - Travel mode (default: 'transit')
   * @param {boolean} alternatives - Whether to include alternative routes
   * @returns {Promise<Object>} Directions response
   * @throws {MapServiceError} If directions request fails
   */
  async getDirections(origin, destination, mode = 'transit', alternatives = true) {
    if (!origin || !destination) {
      throw new MapServiceError('Origin and destination are required', 'INVALID_INPUT');
    }

    if (!this.apiKey) {
      throw new MapServiceError('Google Maps API key is not configured', 'MISSING_API_KEY');
    }

    try {
      // Build params object, ensuring all values are defined
      const params = {
        origin: String(origin).trim(),
        destination: String(destination).trim(),
        mode: String(mode || 'transit'),
        key: String(this.apiKey),
      };

      // Only add alternatives if it's explicitly set (Google Maps API expects boolean as string)
      if (alternatives !== undefined && alternatives !== null) {
        params.alternatives = String(alternatives === true || alternatives === 'true');
      }

      const response = await this.retry(() =>
        axios.get(CONFIG.GOOGLE_MAPS_API.DIRECTIONS, {
          params,
          timeout: 30000, // 30 second timeout
        })
      );

      if (response.data.status === 'ZERO_RESULTS') {
        throw new MapServiceError(
          'No routes found between these locations',
          'ZERO_RESULTS',
          null
        );
      }

      if (response.data.status !== 'OK') {
        throw new MapServiceError(
          response.data.error_message || 'Failed to get directions',
          response.data.status,
          null
        );
      }

      return response.data;
    } catch (error) {
      if (error instanceof MapServiceError) {
        throw error;
      }
      const message = this.getErrorMessage(error);
      throw new MapServiceError(message, error.response?.status || 'UNKNOWN', error);
    }
  }

  /**
   * Get directions from origin to metro station
   * @param {string} origin - Origin address
   * @param {Object} metroStation - Metro station with lat and lng
   * @returns {Promise<Object>} Directions response
   */
  async getDirectionsToMetro(origin, metroStation) {
    const destination = `${metroStation.lat},${metroStation.lng}`;
    return this.getDirections(origin, destination);
  }

  /**
   * Get directions from metro station to destination
   * @param {Object} metroStation - Metro station with lat and lng
   * @param {string} destination - Destination address
   * @returns {Promise<Object>} Directions response
   */
  async getDirectionsFromMetro(metroStation, destination) {
    const origin = `${metroStation.lat},${metroStation.lng}`;
    return this.getDirections(origin, destination);
  }
}

// Export a singleton instance
export const mapService = new MapService();
export default mapService; 