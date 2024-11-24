import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PokemonService } from './pokemon.service';
import { CustomHttpService } from '../custom-http/custom-http.service';
import { Pokemons, PokemonByName, TypeDataResponse } from './interface/Pokemons.interface';

const mockCustomHttpService = {
  get: jest.fn(),
};
const mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
  reset: jest.fn(),
};

describe('PokemonService TEST', () => {
  let service: PokemonService;
  const randomId = 25; 
  const mockRandomPokemonResponse: Pokemons = {
    name: 'pikachu',
    abilities: [{ ability: { name: 'static', url: '' }, is_hidden: false, slot: 1 }],
    base_experience: 112,
    cries: { latest: '', legacy: '' },
    forms: [{ name: 'pikachu', url: '' }],
    game_indices: [],
    height: 4,
    held_items: [],
    id: randomId,
    is_default: true,
    location_area_encounters: '',
    moves: [{ move: { name: 'thunder-shock', url: '' }, version_group_details: [] }],
    order: 35,
    past_abilities: [],
    past_types: [],
    species: { name: 'pikachu', url: '' },
    sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', back_default: '', back_female: null, back_shiny: '', back_shiny_female: null, front_female: null, front_shiny: '', front_shiny_female: null },
    stats: [],
    types: [{ slot: 1, type: { name: 'electric', url: '' } }],
    weight: 60,
  };

  const expectedRandomFormattedPokemon: PokemonByName = {
    name: 'pikachu',
    types: ['electric'],
    abilities: ['static'],
    numberOfAbilities: 1,
    frontImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    moves: ['thunder-shock'],
    NumberOfMoves: 1,
  };
  const mockPokemonResponse: Pokemons = {
    name: 'charizard',
    abilities: [{ ability: { name: 'blaze', url: '' }, is_hidden: false, slot: 1 }, { ability: { name: 'solar-power', url: '' }, is_hidden: false, slot: 3 }],
    base_experience: 240,
    cries: { latest: '', legacy: '' },
    forms: [{ name: 'charizard', url: '' }],
    game_indices: [],
    height: 17,
    held_items: [],
    id: 6,
    is_default: true,
    location_area_encounters: '',
    moves: [{ move: { name: 'mega-punch', url: '' }, version_group_details: [] }, { move: { name: 'fire-punch', url: '' }, version_group_details: [] }],
    order: 7,
    past_abilities: [],
    past_types: [],
    species: { name: 'charizard', url: '' },
    sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', back_default: '', back_female: null, back_shiny: '', back_shiny_female: null, front_female: null, front_shiny: '', front_shiny_female: null },
    stats: [],
    types: [{ slot: 1, type: { name: 'fire', url: '' } }, { slot: 2, type: { name: 'flying', url: '' } }],
    weight: 905,
  };
  const expectedFormattedPokemon: PokemonByName = {
    name: 'charizard',
    types: ['fire', 'flying'],
    abilities: ['blaze', 'solar-power'],
    numberOfAbilities: 2,
    frontImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    moves: ['mega-punch', 'fire-punch'],
    NumberOfMoves: 2,
  };
  const mockTypeResponse: TypeDataResponse = {
    results: [
      { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
    ],
  };

  const mockPokemonListResponse = {
    pokemon: [
      { pokemon: { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' }, slot: 1 },
    ],
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: CustomHttpService,
          useValue: mockCustomHttpService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPokemonByName', () => {
    it('should return a formatted pokemon by name', async () => {

      mockCustomHttpService.get.mockResolvedValue(mockPokemonResponse);

      const result = await service.getPokemonByName('charizard');
      expect(result).toEqual(expectedFormattedPokemon);
      expect(mockCustomHttpService.get).toHaveBeenCalledWith('pokemon/charizard');
    });

    it('should throw NotFoundException if pokemon does not exist', async () => {
      mockCustomHttpService.get.mockRejectedValue(new Error('Pokemon not found'));
      await expect(service.getPokemonByName('invalidPokemon')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPokemonByType', () => {
    it('should return a list of pokemons by type', async () => {
        mockCustomHttpService.get.mockResolvedValueOnce(mockTypeResponse);
        mockCustomHttpService.get.mockResolvedValueOnce(mockPokemonListResponse);
        const result = await service.getPokemonByType('fire');
        expect(result).toEqual([{ name: 'charizard', type: 'fire' }]);
        expect(mockCustomHttpService.get).toHaveBeenCalledWith('type');
        expect(mockCustomHttpService.get).toHaveBeenCalledWith('type/10');
    });

    it('should throw NotFoundException if the type list not found', async () => {
      mockCustomHttpService.get.mockRejectedValue(new Error('Type list not found'));
      await expect(service.getPokemonByType('invalidType')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getRandomPokemon', () => {
    it('should return a random pokemon', async () => {

      jest.spyOn(Math, 'random').mockReturnValue((randomId - 1) / 151);

      mockCustomHttpService.get.mockResolvedValue(mockRandomPokemonResponse);

      const result = await service.getRandomPokemon();
      expect(result).toEqual(expectedRandomFormattedPokemon);
      expect(mockCustomHttpService.get).toHaveBeenCalledWith(`pokemon/${randomId}`);
    });

    it('should throw NotFoundException if random pokemon does not exist', async () => {
      mockCustomHttpService.get.mockRejectedValue(new Error('Pokemon not found'));
      await expect(service.getRandomPokemon()).rejects.toThrow(NotFoundException);
    });
  });

  it('PokemonController should be defined', () => {
    expect(service).toBeDefined();
  });

});