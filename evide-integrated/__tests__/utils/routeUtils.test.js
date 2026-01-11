import {
  findRouteWithShortestTime,
  findRouteWithShortestDistance,
  findRouteWithLowestFare,
  sortRoutes,
  generateRandomShade,
} from '../../utils/routeUtils';

describe('routeUtils', () => {
  const mockRoutes = [
    {
      legs: [{
        duration: { value: 3600, text: '1 hour' },
        distance: { value: 10000, text: '10 km' },
      }],
      fare: { value: 50, text: '₹50' },
    },
    {
      legs: [{
        duration: { value: 1800, text: '30 mins' },
        distance: { value: 5000, text: '5 km' },
      }],
      fare: { value: 30, text: '₹30' },
    },
    {
      legs: [{
        duration: { value: 7200, text: '2 hours' },
        distance: { value: 15000, text: '15 km' },
      }],
      fare: { value: 100, text: '₹100' },
    },
  ];

  describe('findRouteWithShortestTime', () => {
    it('should return route with shortest time', () => {
      const result = findRouteWithShortestTime(mockRoutes);
      expect(result.legs[0].duration.value).toBe(1800);
    });

    it('should return null for empty array', () => {
      expect(findRouteWithShortestTime([])).toBeNull();
    });

    it('should return null for null input', () => {
      expect(findRouteWithShortestTime(null)).toBeNull();
    });
  });

  describe('findRouteWithShortestDistance', () => {
    it('should return route with shortest distance', () => {
      const result = findRouteWithShortestDistance(mockRoutes);
      expect(result.legs[0].distance.value).toBe(5000);
    });

    it('should return null for empty array', () => {
      expect(findRouteWithShortestDistance([])).toBeNull();
    });
  });

  describe('findRouteWithLowestFare', () => {
    it('should return route with lowest fare', () => {
      const result = findRouteWithLowestFare(mockRoutes);
      expect(result.fare.value).toBe(30);
    });

    it('should return null for empty array', () => {
      expect(findRouteWithLowestFare([])).toBeNull();
    });
  });

  describe('sortRoutes', () => {
    it('should sort routes by time', () => {
      const sorted = sortRoutes(mockRoutes, 'time');
      expect(sorted[0].legs[0].duration.value).toBe(1800);
      expect(sorted[2].legs[0].duration.value).toBe(7200);
    });

    it('should sort routes by distance', () => {
      const sorted = sortRoutes(mockRoutes, 'distance');
      expect(sorted[0].legs[0].distance.value).toBe(5000);
      expect(sorted[2].legs[0].distance.value).toBe(15000);
    });

    it('should sort routes by fare', () => {
      const sorted = sortRoutes(mockRoutes, 'fare');
      expect(sorted[0].fare.value).toBe(30);
      expect(sorted[2].fare.value).toBe(100);
    });

    it('should return original array for invalid criteria', () => {
      const sorted = sortRoutes(mockRoutes, 'invalid');
      expect(sorted).toEqual(mockRoutes);
    });

    it('should return empty array for empty input', () => {
      expect(sortRoutes([], 'time')).toEqual([]);
    });
  });

  describe('generateRandomShade', () => {
    it('should generate a valid hex color', () => {
      const color = generateRandomShade('#FF0000');
      expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should handle color without #', () => {
      const color = generateRandomShade('FF0000');
      expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });
});

