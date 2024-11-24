import { HttpExceptionFilter } from './http-exception.filter';
import { HttpException } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common/interfaces';
import { Response, Request } from 'express';
describe('HttpExceptionFilter TEST', () => {
    let httpExceptionFilter: HttpExceptionFilter;
    let response: Response;
    let request: Request;
    let host: ArgumentsHost;

    beforeEach(() => {
        httpExceptionFilter = new HttpExceptionFilter();
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        request = {
            url: '/test',
        } as Request;

        host = {
            switchToHttp: () => ({
                getRequest: () => request,
                getResponse: () => response,
            }),
        } as ArgumentsHost;

    });

    it('should be defined', () => {
        expect(httpExceptionFilter).toBeDefined();
    });

    it('should handle the HttpException and send a response', () => {
        const exception = new HttpException('Not Found', 404);
        httpExceptionFilter.catch(exception, host);
    
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({
          statusCode: 404,
          timestamp: expect.any(String), 
          path: '/test',
          message: 'Not Found',
        });
    });

    it('should handle the HttpException and send a response with default message', () => {
        const exception = new HttpException('Internal server error', 500);
        httpExceptionFilter.catch(exception, host);
    
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({
            statusCode: 500,
            timestamp: expect.any(String),
            path: '/test',
            message: 'Internal server error',
          });

    });


});