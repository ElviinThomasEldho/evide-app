/**
 * Utility functions for route processing and analysis
 */

/**
 * Find route with shortest travel time
 * @param {Array} routes - Array of route objects
 * @returns {Object|null} Route with shortest time
 */
export const findRouteWithShortestTime = (routes) => {
  if (!routes || routes.length === 0) return null;
  
  return routes.reduce((shortest, current) => {
    const currentTime = current.legs?.[0]?.duration?.value || Infinity;
    const shortestTime = shortest.legs?.[0]?.duration?.value || Infinity;
    return currentTime < shortestTime ? current : shortest;
  });
};

/**
 * Find route with shortest distance
 * @param {Array} routes - Array of route objects
 * @returns {Object|null} Route with shortest distance
 */
export const findRouteWithShortestDistance = (routes) => {
  if (!routes || routes.length === 0) return null;
  
  return routes.reduce((shortest, current) => {
    const currentDistance = current.legs?.[0]?.distance?.value || Infinity;
    const shortestDistance = shortest.legs?.[0]?.distance?.value || Infinity;
    return currentDistance < shortestDistance ? current : shortest;
  });
};

/**
 * Find route with lowest fare
 * @param {Array} routes - Array of route objects
 * @returns {Object|null} Route with lowest fare
 */
export const findRouteWithLowestFare = (routes) => {
  if (!routes || routes.length === 0) return null;
  
  return routes.reduce((cheapest, current) => {
    const currentFare = current.fare?.value || Infinity;
    const cheapestFare = cheapest.fare?.value || Infinity;
    return currentFare < cheapestFare ? current : cheapest;
  });
};

/**
 * Sort routes by different criteria
 * @param {Array} routes - Array of route objects
 * @param {string} criteria - Sort criteria ('time', 'distance', 'fare')
 * @returns {Array} Sorted routes array
 */
export const sortRoutes = (routes, criteria) => {
  if (!routes || routes.length === 0) return [];
  
  const sortedRoutes = [...routes];
  
  switch (criteria) {
    case 'time':
      return sortedRoutes.sort((a, b) => {
        const timeA = a.legs?.[0]?.duration?.value || Infinity;
        const timeB = b.legs?.[0]?.duration?.value || Infinity;
        return timeA - timeB;
      });
      
    case 'distance':
      return sortedRoutes.sort((a, b) => {
        const distanceA = a.legs?.[0]?.distance?.value || Infinity;
        const distanceB = b.legs?.[0]?.distance?.value || Infinity;
        return distanceA - distanceB;
      });
      
    case 'fare':
      return sortedRoutes.sort((a, b) => {
        const fareA = a.fare?.value || Infinity;
        const fareB = b.fare?.value || Infinity;
        return fareA - fareB;
      });
      
    default:
      return sortedRoutes;
  }
};

/**
 * Generate a random shade of a hex color
 * @param {string} hexColor - Base hex color (e.g., '#FF0000')
 * @returns {string} Random shade of the color
 */
export const generateRandomShade = (hexColor) => {
  // Remove the # if present
  const color = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Generate random factor (0.5 to 1.0 for lighter shades)
  const factor = 0.5 + Math.random() * 0.5;
  
  // Apply factor and ensure values stay within 0-255
  const newR = Math.min(255, Math.floor(r + (255 - r) * factor));
  const newG = Math.min(255, Math.floor(g + (255 - g) * factor));
  const newB = Math.min(255, Math.floor(b + (255 - b) * factor));
  
  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

export default {
  findRouteWithShortestTime,
  findRouteWithShortestDistance,
  findRouteWithLowestFare,
  sortRoutes,
  generateRandomShade,
}; 