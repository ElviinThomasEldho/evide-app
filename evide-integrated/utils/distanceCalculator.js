import { CONFIG } from '../constants/config';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {Object} coord1 - First coordinate {lat, lng}
 * @param {Object} coord2 - Second coordinate {lat, lng}
 * @returns {number} Distance in meters
 */
export const calculateDistance = (coord1, coord2) => {
  const R = CONFIG.EARTH_RADIUS_METERS;
  const φ1 = (coord1.lat * Math.PI) / 180;
  const φ2 = (coord2.lat * Math.PI) / 180;
  const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Find the nearest station from a given coordinate
 * @param {Object} coordinates - Target coordinate {lat, lng}
 * @param {Array} stations - Array of station objects with {name, lat, lng}
 * @returns {Object|null} Nearest station object or null if none found
 */
export const findNearestStation = (coordinates, stations) => {
  if (!coordinates || !stations || stations.length === 0) {
    return null;
  }

  let minDistance = Number.MAX_VALUE;
  let nearestStation = null;

  for (const station of stations) {
    const distance = calculateDistance(coordinates, station);
    if (distance < minDistance) {
      minDistance = distance;
      nearestStation = { ...station, distance };
    }
  }

  return nearestStation;
};

export default {
  calculateDistance,
  findNearestStation,
}; 