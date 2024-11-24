import { Test, TestingModule } from "@nestjs/testing";
import { AxiosAdapter } from "../common/adapters/axios.adapter";
import { CustomHttpService } from "./custom-http.service";
import { ConfigService } from "@nestjs/config";

describe('CustomHttpService TEST', () => {
    let service: CustomHttpService;
    let axiosAdapter: AxiosAdapter;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
              CustomHttpService,
              {
                provide: AxiosAdapter,
                useValue: {
                  get: jest.fn(), 
                },
              },
              {
                provide: ConfigService,
                useValue: {
                  get: jest.fn().mockReturnValue('https://pokeapi.co/api/v2/'), 
                },
              },
            ],
          }).compile();
      
          service = module.get<CustomHttpService>(CustomHttpService);
          axiosAdapter = module.get<AxiosAdapter>(AxiosAdapter);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call axiosAdapter.get', async () => {
        await service.get('pokemon');
        expect(axiosAdapter.get).toHaveBeenCalled();
    });

    describe('Method Get', () => {
        it('should return data', async () => {
            const data = { name: 'pikachu' };
            jest.spyOn(axiosAdapter, 'get').mockResolvedValue(data);
            expect(await service.get('pokemon')).toEqual(data);
        });   

        it('should throw error', async () => {
            jest.spyOn(axiosAdapter, 'get').mockRejectedValue(new Error());
            await expect(service.get('pokemon')).rejects.toThrow();
        });
    });
});