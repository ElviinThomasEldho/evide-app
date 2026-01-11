import {
  calculateDistance,
  findNearestStation,
} from '../../utils/distanceCalculator';

describe('distanceCalculator', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two coordinates', () => {
      const coord1 = { lat: 10.0, lng: 76.3 };
      const coord2 = { lat: 10.1, lng: 76.4 };
      const distance = calculateDistance(coord1, coord2);
      expect(distance).toBeGreaterThan(0);
      expect(typeof distance).toBe('number');
    });

    it('should return 0 for same coordinates', () => {
      const coord = { lat: 10.0, lng: 76.3 };
      const distance = calculateDistance(coord, coord);
      expect(distance).toBe(0);
    });
  });

  describe('findNearestStation', () => {
    const stations = [
      { name: 'Station A', lat: 10.0, lng: 76.3 },
      { name: 'Station B', lat: 10.1, lng: 76.4 },
      { name: 'Station C', lat: 10.2, lng: 76.5 },
    ];

    it('should find nearest station', () => {
      const target = { lat: 10.05, lng: 76.35 };
      const nearest = findNearestStation(target, stations);
      expect(nearest).toBeDefined();
      expect(nearest.name).toBe('Station A');
      expect(nearest.distance).toBeDefined();
    });

    it('should return null for empty stations array', () => {
      const target = { lat: 10.0, lng: 76.3 };
      expect(findNearestStation(target, [])).toBeNull();
    });

    it('should return null for null coordinates', () => {
      expect(findNearestStation(null, stations)).toBeNull();
    });

    it('should return null for null stations', () => {
      const target = { lat: 10.0, lng: 76.3 };
      expect(findNearestStation(target, null)).toBeNull();
    });
  });
});

