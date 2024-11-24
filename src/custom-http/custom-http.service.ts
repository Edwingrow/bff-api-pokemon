import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class CustomHttpService {
  private readonly baseUrl: string;
  constructor(
    @Inject(AxiosAdapter) private readonly api: AxiosAdapter,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('POKEMON_API_BASE_URL');
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.api.get<T>(`${this.baseUrl}/${endpoint}`);
      return response;
    } catch{
      throw new BadRequestException('Error getting data');
    }
  }
}
