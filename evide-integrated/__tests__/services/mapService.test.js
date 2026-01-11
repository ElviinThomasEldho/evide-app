import { mapService, MapServiceError } from '../../services/mapService';
import axios from 'axios';

jest.mock('axios');

describe('MapService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCoordinatesFromAddress', () => {
    it('should return coordinates for valid address', async () => {
      const mockResponse = {
        data: {
          results: [{
            geometry: {
              location: { lat: 10.0, lng: 76.3 },
            },
          }],
        },
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await mapService.getCoordinatesFromAddress('Kochi');
      expect(result).toEqual({ lat: 10.0, lng: 76.3 });
    });

    it('should throw MapServiceError for empty address', async () => {
      await expect(mapService.getCoordinatesFromAddress('')).rejects.toThrow(MapServiceError);
    });

    it('should throw MapServiceError for no results', async () => {
      axios.get.mockResolvedValue({ data: { results: [] } });
      await expect(mapService.getCoordinatesFromAddress('Invalid')).rejects.toThrow(MapServiceError);
    });
  });

  describe('getDirections', () => {
    it('should return directions for valid route', async () => {
      const mockResponse = {
        data: {
          status: 'OK',
          routes: [{ legs: [] }],
        },
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await mapService.getDirections('Origin', 'Destination');
      expect(result.status).toBe('OK');
    });

    it('should throw MapServiceError for missing origin', async () => {
      await expect(mapService.getDirections('', 'Destination')).rejects.toThrow(MapServiceError);
    });

    it('should throw MapServiceError for ZERO_RESULTS', async () => {
      axios.get.mockResolvedValue({ data: { status: 'ZERO_RESULTS' } });
      await expect(mapService.getDirections('Origin', 'Destination')).rejects.toThrow(MapServiceError);
    });
  });

  describe('error handling', () => {
    it('should retry on network errors', async () => {
      axios.get
        .mockRejectedValueOnce(new Error('Network Error'))
        .mockResolvedValueOnce({
          data: {
            results: [{
              geometry: { location: { lat: 10.0, lng: 76.3 } },
            }],
          },
        });

      const result = await mapService.getCoordinatesFromAddress('Kochi');
      expect(result).toEqual({ lat: 10.0, lng: 76.3 });
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });
});

