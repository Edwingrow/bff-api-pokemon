import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { CustomHttpService } from '../custom-http/custom-http.service';
import { PokemonByName } from './interface/Pokemons.interface';
import { NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('PokemonController TEST', () => {
  let controller: PokemonController;
  let service: PokemonService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        PokemonService,
        {
          provide: CustomHttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        }
      ],
    }).compile();  
    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  describe('getPokemonByName', () => {
    it('should return a pokemon with the correct structure', async () => {
      const pokemonName = 'charizard';
      jest.spyOn(service, 'getPokemonByName').mockReturnValue(
        Promise.resolve({
          name: expect.any(String),
          types: expect.arrayContaining([expect.any(String)]),
          abilities: expect.arrayContaining([expect.any(String)]),
          numberOfAbilities: expect.any(Number),
          frontImage: expect.any(String),
          moves: expect.arrayContaining([expect.any(String)]),
          NumberOfMoves: expect.any(Number),
        } as PokemonByName),
      );
      const result = await controller.getPokemonByName(pokemonName);
      expect(result).toBeDefined();
      expect(result.name).toEqual(expect.any(String));
      expect(result.types).toEqual(
        expect.arrayContaining([expect.any(String)]),
      );
    });

    it('should throw NotFoundException if pokemon not found', async () => {
      const pokemonName = 'nonexistent-pokemon';
      jest
        .spyOn(service, 'getPokemonByName')
        .mockRejectedValue(new NotFoundException());
      await expect(controller.getPokemonByName(pokemonName)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
