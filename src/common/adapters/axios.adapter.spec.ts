import { AxiosAdapter } from './axios.adapter';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

jest.mock('axios');
describe('AxiosAdapter TEST ', () => {
    let axiosAdapter: AxiosAdapter; 

    beforeEach(() => {
        axiosAdapter = new AxiosAdapter();
    });

    it('should be defined', () => {
        expect(axiosAdapter).toBeDefined();
    });

    it('should call axios.get', async () => {
        const mockResponse = { data: { message: 'Success' } };
        (axios.get as jest.Mock).mockResolvedValue(mockResponse);
        const response = await axiosAdapter.get('localhost:3000');
        expect(response).toEqual(mockResponse.data);
    });

    it('should call BadRequestException if response is not 404', async () => {
        const axiosError: AxiosError = {
          isAxiosError: true,
          toJSON: () => ({}),
          config: {} as InternalAxiosRequestConfig,
          code: undefined,
          request: {},
          response: {
            status: 400,
            data: { message: 'Bad Request' },
            statusText: 'Bad Request',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
          } as AxiosResponse,
          message: 'Bad Request Error',
          name: 'AxiosError',
        };
        (axios.get as jest.Mock).mockRejectedValue(axiosError);
    
        await expect(axiosAdapter.get('localhost:3000')).rejects.toThrow(BadRequestException);
      });
    
      it('should call NotFoundException if response is 404', async () => {
        const axiosError: AxiosError = {
          isAxiosError: true,
          toJSON: () => ({}),
          config: {} as InternalAxiosRequestConfig,
          code: undefined,
          request: {},
          response: {
            status: 404,
            data: {},
            statusText: 'Not Found',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
          } as AxiosResponse,
          message: 'Not Found',
          name: 'AxiosError',
        };
        (axios.get as jest.Mock).mockRejectedValue(axiosError);
    
        await expect(axiosAdapter.get('localhost:3000')).rejects.toThrow(NotFoundException);
      });
    
});