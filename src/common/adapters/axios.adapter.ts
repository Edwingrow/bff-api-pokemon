import axios, { AxiosInstance, AxiosError } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const response = await this.axios.get<T>(url);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError; // Asegúrate de que es un AxiosError

      if (axiosError.response?.status === 404) {
        throw new NotFoundException(`Recurso no encontrado: ${url}`);
      } else if (axiosError.response) {
          console.error(`Request failed with status code ${axiosError.response.status}`, axiosError.response.data);
          throw new BadRequestException(`Request failed with status code ${axiosError.response.status} - ${axiosError.response.data}`);
      } else {
          console.error(`Error: ${axiosError.message}`, error);
          throw new BadRequestException(`Error realizando la petición: ${axiosError.message}`);
      }
    }
  }
}
