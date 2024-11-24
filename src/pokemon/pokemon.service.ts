import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CustomHttpService } from '../custom-http/custom-http.service';
import { PokemonByName, PokemonByType, PokemonList, Pokemons, TypeDataResponse } from './interface/Pokemons.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { CacheUtil } from '../utils/cache.util';

@Injectable()
export class PokemonService {
  private cacheUtil: CacheUtil;
  constructor(
    private readonly customHttpService: CustomHttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { 
    this.cacheUtil = new CacheUtil(cacheManager);
  }




  async getPokemonByName(name: string): Promise<PokemonByName> {
    try {
      return this.getPokemonByIdOrName(name);  
    }
    catch {
      throw new NotFoundException('Pokemon by name not found')
      }
  }

  async getPokemonByType(type: string): Promise<PokemonByType[]> {
    try {
      
      const TypeId = await this.getPokemonListByType(type);
      if (!TypeId) throw new NotFoundException('Type list not found or Pokemon not found');
    
      const key = this.cacheUtil.GenerateKey('getPokemonByType', TypeId)
      const pokemonList = await this.customHttpService.get<PokemonList>(`type/${TypeId}`);
      const cachePokemonList = await this.cacheUtil.checkCache(key, pokemonList, 60000);
      
      
      return cachePokemonList.pokemon.map(pokemon => ({ name: pokemon.pokemon.name, type }));
    }
    catch {
      throw new NotFoundException('Type list not found or Pokemon not found');
     
    }
  }

  async getRandomPokemon(): Promise<PokemonByName> {
    try {
      const randomId = Math.floor(Math.random() * 151) + 1;
      return this.getPokemonByIdOrName(randomId.toString());
    }
    catch {
      throw new NotFoundException('Random Pokemon not found');
    }
  }


   getPokemonByIdOrName = async (Params: string ): Promise<PokemonByName> => {
    try {
     
      const  pokemon = await this.customHttpService.get<Pokemons>(`pokemon/${Params}`);
      const key = this.cacheUtil.GenerateKey('getPokemonById', Params)
      const cachePokemon = await this.cacheUtil.checkCache(key, pokemon, 60000); 

      return this.formatPokemon(cachePokemon);
    }
    catch {
      throw new NotFoundException(`Pokemon not found: ${Params}`);
    }
  }

  private formatPokemon(pokemon: Pokemons): PokemonByName {
    if (!pokemon) {
        throw new NotFoundException('Invalid Pokemon data');
    }
    
    const numberOfAbilities = pokemon.abilities.length;
    const frontImage = pokemon.sprites.front_default;
    const moves = pokemon.moves.map(move => move.move.name);
    const NumberOfMoves = moves.length
    return {
        name: pokemon.name,
        types: pokemon.types.map(type => type.type.name),
        numberOfAbilities,
        abilities: pokemon.abilities.map(ability => ability.ability.name),
        frontImage,
        NumberOfMoves,
        moves
    };
}

  private async getPokemonListByType(type: string): Promise<string> {
    try {
      const typeData = await this.customHttpService.get<TypeDataResponse>('type');

      const typeUrl = typeData.results.find(typeData => typeData.name === type).url
      if (!typeUrl)  return null
      const key = this.cacheUtil.GenerateKey('getPokemonListByType', typeUrl)
      const cacheType = await this.cacheUtil.checkCache(key, typeUrl, 60000);

      const TypeId = this.extractNumberFromUrl(cacheType);
      if(!TypeId) return null

      return TypeId
    }
    catch {
      return null
    }
  }


  private extractNumberFromUrl = (url: string): string => {
    const match = url.match(/\/(\d+)\/$/);
    return match ? match[1] : '';
  }
}
