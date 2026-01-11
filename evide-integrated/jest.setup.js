// Jest setup file
// This file runs before each test file

// Mock expo-constants
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      googleMapsApiKey: 'test-api-key',
    },
  },
}));

// Mock expo-location
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: 'granted' })
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 10.0,
        longitude: 76.3,
      },
    })
  ),
}));

// Silence console warnings in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

