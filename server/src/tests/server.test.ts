import { Response, Request } from 'express';
import { getBatteriesService } from '../service/batteryService';
import { getBatteries } from '../controller/batteryController';

jest.mock('../service/batteryService', () => ({
  getBatteriesService: jest.fn(),
}));

describe('getBatteries Controller', () => {
  it('should return batteries based on query parameters', async () => {
    const mockRequest: Partial<Request> = {
      query: {
        postCodeStart: '10000',
        postCodeEnd: '20000',
        searchTerm: 'Battery123',
      },
    };
    const mockResponse: Partial<Response> = {
      json: jest.fn(),
      status: jest.fn(),
    };

    (getBatteriesService as jest.Mock).mockResolvedValue([
      { name: 'Battery123', postcode: 15000, wattCapacity: '100' },
    ]);

    await getBatteries(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith([
      { name: 'Battery123', postcode: 15000, wattCapacity: '100' },
    ]);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return 500 status code', async () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn(),
      status: jest.fn(),
    };

    (getBatteriesService as jest.Mock).mockRejectedValue(new Error('Some error'));

    await getBatteries(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });

});
