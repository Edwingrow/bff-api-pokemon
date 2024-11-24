import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from "./pokemon.service";
import { PokemonController } from "./pokemon.controller";
import { CustomHttpService } from "../custom-http/custom-http.service";
import {NotFoundException } from '@nestjs/common';
describe('PokemonsController', () => {
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
        ],
        }).compile();
    
        controller = module.get<PokemonController>(PokemonController);
        service = module.get<PokemonService>(PokemonService);
    });
    
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
  
    describe('getPokemonByName', () => {
        it('should return a Pokemon with its name and type', async () => {
            const pokemonName = 'charizard';
            const pokemonData = {
                name: 'charizard',
                types: [
                    { type: { name: 'fire' } }
                ],
                abilities: [
                    { ability: { name: 'blaze' } }
                ],
                sprites: {
                    front_default: 'https://example.com/charizard.png'
                },
                moves: [
                    { move: { name: 'flamethrower' } }
                ]
            };

            jest.spyOn(service['customHttpService'], 'get')
            .mockResolvedValueOnce(pokemonData);

            const result = await controller.getPokemonByName(pokemonName);
            
            expect(result).toEqual({
                name: 'charizard',
                types: ['fire'],
                numberOfAbilities: 1,
                abilities: ['blaze'],
                frontImage: 'https://example.com/charizard.png',
                NumberOfMoves: 1,
                moves: ['flamethrower']
            });
        });
        it('should throw NotFoundException if the pokemon does not exist', async () => {
            const pokemonName = 'Edwin';
            
            jest.spyOn(service, 'getPokemonByName')
                .mockRejectedValueOnce(new NotFoundException(`Pokemon not found: ${pokemonName}`));

            try {
                await controller.getPokemonByName(pokemonName);
            } catch (error) {
                expect(error.message).toBe(`Pokemon not found: ${pokemonName}`);
            }
        });

     

    }); 

    describe('getRandomPokemon', () => {
        it('should throw NotFoundException if the pokemon does not exist', async () => {
            const pokemonName = 'Edwin';
            
            jest.spyOn(service, 'getPokemonByName')
                .mockRejectedValueOnce(new NotFoundException(`Pokemon not found: ${pokemonName}`));

            try {
                await controller.getPokemonByName(pokemonName);
            } catch (error) {
                expect(error.message).toBe(`Pokemon not found: ${pokemonName}`);
            }
        });

        it('should return a random Pokemon with its name and type', async () => {
            const pokemonData = {
                name: 'charizard',
                types: [
                    { type: { name: 'fire' } }
                ],
                abilities: [
                    { ability: { name: 'blaze' } }
                ],
                sprites: {
                    front_default: 'https://example.com/charizard.png'
                },
                moves: [
                    { move: { name: 'flamethrower' } }
                ]
            };

            jest.spyOn(service['customHttpService'], 'get')
                .mockResolvedValueOnce(pokemonData); 

            const result = await controller.getRandomPokemon();
            
            expect(result).toEqual({
                name: 'charizard',
                types: ['fire'],
                numberOfAbilities: 1,
                abilities: ['blaze'],
                frontImage: 'https://example.com/charizard.png',
                NumberOfMoves: 1,
                moves: ['flamethrower']
            });
        });
    });


    describe('getPokemonByType', () => {
        it('should throw NotFoundException if the pokemon does not exist', async () => {
            const pokemonName = 'Edwin';
            
            jest.spyOn(service, 'getPokemonByName')
                .mockRejectedValueOnce(new NotFoundException(`Pokemon not found: ${pokemonName}`));

            try {
                await controller.getPokemonByName(pokemonName);
            } catch (error) {
                expect(error.message).toBe(`Pokemon not found: ${pokemonName}`);
            }
        });

        it('should return a list of Pokemon with their names and types', async () => {
            const type = 'fire';
            const pokemonData = [
                { name: 'charmander', type: 'fire' },
                { name: 'charmeleon', type: 'fire' },
                { name: 'charizard', type: 'fire' },
                { name: 'vulpix', type: 'fire' },
                { name: 'ninetales', type: 'fire' },
                { name: 'growlithe', type: 'fire' },
                { name: 'arcanine', type: 'fire' },
                { name: 'ponyta', type: 'fire' },
                { name: 'rapidash', type: 'fire' },
                { name: 'magmar', type: 'fire' },
                { name: 'flareon', type: 'fire' },
                { name: 'moltres', type: 'fire' },
                { name: 'cyndaquil', type: 'fire' },
                { name: 'quilava', type: 'fire' },
                { name: 'typhlosion', type: 'fire' },
                { name: 'slugma', type: 'fire' },
                { name: 'magcargo', type: 'fire' },
                { name: 'houndour', type: 'fire' },
                { name: 'houndoom', type: 'fire' },
                { name: 'magby', type: 'fire' },
                { name: 'entei', type: 'fire' },
                { name: 'ho-oh', type: 'fire' },
                { name: 'torchic', type: 'fire' },
                { name: 'combusken', type: 'fire' },
                { name: 'blaziken', type: 'fire' },
                { name: 'numel', type: 'fire' },
                { name: 'camerupt', type: 'fire' },
                { name: 'torkoal', type: 'fire' },
                { name: 'chimchar', type: 'fire' },
                { name: 'monferno', type: 'fire' },
                { name: 'infernape', type: 'fire' },
                { name: 'magmortar', type: 'fire' },
                { name: 'heatran', type: 'fire' },
                { name: 'victini', type: 'fire' },
                { name: 'tepig', type: 'fire' },
                { name: 'pignite', type: 'fire' },
                { name: 'emboar', type: 'fire' },
                { name: 'pansear', type: 'fire' },
                { name: 'simisear', type: 'fire' },
                { name: 'darumaka', type: 'fire' },
                { name: 'darmanitan-standard', type: 'fire' },
                { name: 'litwick', type: 'fire' },
                { name: 'lampent', type: 'fire' },
                { name: 'chandelure', type: 'fire' },
                { name: 'heatmor', type: 'fire' },
                { name: 'larvesta', type: 'fire' },
                { name: 'volcarona', type: 'fire' },
                { name: 'reshiram', type: 'fire' },
                { name: 'fennekin', type: 'fire' },
                { name: 'braixen', type: 'fire' },
                { name: 'delphox', type: 'fire' },
                { name: 'fletchinder', type: 'fire' },
                { name: 'talonflame', type: 'fire' },
                { name: 'litleo', type: 'fire' },
                { name: 'pyroar', type: 'fire' },
                { name: 'volcanion', type: 'fire' },
                { name: 'litten', type: 'fire' },
                { name: 'torracat', type: 'fire' },
                { name: 'incineroar', type: 'fire' },
                { name: 'oricorio-baile', type: 'fire' },
                { name: 'salandit', type: 'fire' },
                { name: 'salazzle', type: 'fire' },
                { name: 'turtonator', type: 'fire' },
                { name: 'blacephalon', type: 'fire' },
                { name: 'scorbunny', type: 'fire' },
                { name: 'raboot', type: 'fire' },
                { name: 'cinderace', type: 'fire' },
                { name: 'carkol', type: 'fire' },
                { name: 'coalossal', type: 'fire' },
                { name: 'sizzlipede', type: 'fire' },
                { name: 'centiskorch', type: 'fire' },
                { name: 'fuecoco', type: 'fire' },
                { name: 'crocalor', type: 'fire' },
                { name: 'skeledirge', type: 'fire' },
                { name: 'charcadet', type: 'fire' },
                { name: 'armarouge', type: 'fire' },
                { name: 'ceruledge', type: 'fire' },
                { name: 'scovillain', type: 'fire' },
                { name: 'iron-moth', type: 'fire' },
                { name: 'chi-yu', type: 'fire' },
                { name: 'gouging-fire', type: 'fire' },
                { name: 'rotom-heat', type: 'fire' },
                { name: 'castform-sunny', type: 'fire' },
                { name: 'darmanitan-zen', type: 'fire' },
                { name: 'charizard-mega-x', type: 'fire' },
                { name: 'charizard-mega-y', type: 'fire' },
                { name: 'houndoom-mega', type: 'fire' },
                { name: 'blaziken-mega', type: 'fire' },
                { name: 'groudon-primal', type: 'fire' },
                { name: 'camerupt-mega', type: 'fire' },
                { name: 'marowak-alola', type: 'fire' },
                { name: 'salazzle-totem', type: 'fire' },
                { name: 'marowak-totem', type: 'fire' },
                { name: 'darmanitan-galar-zen', type: 'fire' },
                { name: 'charizard-gmax', type: 'fire' },
                { name: 'cinderace-gmax', type: 'fire' },
                { name: 'coalossal-gmax', type: 'fire' },
                { name: 'centiskorch-gmax', type: 'fire' },
                { name: 'growlithe-hisui', type: 'fire' },
                { name: 'arcanine-hisui', type: 'fire' },
                { name: 'typhlosion-hisui', type: 'fire' },
                { name: 'tauros-paldea-blaze-breed', type: 'fire' },
                { name: 'ogerpon-hearthflame-mask', type: 'fire' }
            ];

            jest.spyOn(service, 'getPokemonByType')
                .mockResolvedValueOnce(pokemonData); 

            const result = await controller.getPokemonByType(type);
            
            expect(result).toEqual(pokemonData);
        });
    });



});