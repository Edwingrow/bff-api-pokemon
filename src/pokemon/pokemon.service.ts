import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomHttpService } from 'src/custom-http/custom-http.service';
import { PokemonByName, PokemonByType, PokemonList, Pokemons } from './interface/Pokemons.interface';
import { getFormattedDate } from 'src/utils/date.utils';

@Injectable()
export class PokemonService {
  constructor(
    private readonly customHttpService: CustomHttpService,
  ) { }


  // async getPokemonByName(name: string): Promise<PokemonByName> {
  //   try {
  //     const pokemon = await this.customHttpService.get<Pokemons>(`pokemon/${name}`);

  //     if (!pokemon || !pokemon.name || !pokemon.types || !pokemon.abilities) throw new NotFoundException(`Pokemon ${name} not found`);

  //     const pokemonByName: PokemonByName = {
  //       name: pokemon.name,
  //       types: pokemon.types.map(type => type.type.name) || [],
  //       abilities: pokemon.abilities.map(ability => ability.ability.name) || [],
  //     };
  //     return pokemonByName;
  //   }
  //   catch (error) {
  //     console.log(`Error: getPokemonByName - ${error}`, getFormattedDate());
  //     throw new NotFoundException('Pokemon by name not found');
  //   }
  // }

  async getPokemonByName(name: string): Promise<PokemonByName> {
    try {
      return this.getPokemonById(name);
    }
    catch (error) {
      console.log(`Error: getPokemonByName - ${error}`, getFormattedDate());
      throw new NotFoundException('Pokemon by name not')
      }
  }

  async getPokemonByType(type: string): Promise<PokemonByType[]> {
    try {
      
      const TypeId = await this.getPokemonListByType(type);
      const pokemonList = await this.customHttpService.get<PokemonList>(`type/${TypeId}`);
      return pokemonList.pokemon.map(pokemon => ({ name: pokemon.pokemon.name, type }));
    }
    catch (error) {
      console.log(`Error: getPokemonByType - ${error}`, getFormattedDate());
      throw new NotFoundException('Pokemon by type not found');
    }
  }

  async getRandomPokemon(): Promise<PokemonByName> {
    try {
      const randomId = Math.floor(Math.random() * 898) + 1;
      return this.getPokemonById(randomId.toString());
    }
    catch (error) {
      console.log(`Error: getRandomPokemon - ${error}`, getFormattedDate());
      throw new NotFoundException('Random Pokemon not found');
    }
  }


  private getPokemonById = async (Params: string ): Promise<PokemonByName> => {
    try {
      const  pokemon = await this.customHttpService.get<Pokemons>(`pokemon/${Params}`);
      return this.formatPokemon(pokemon);
    }
    catch (error) {
      console.log(`Error: getPokemonById - ${error}`, getFormattedDate());
      throw new NotFoundException('Pokemon by id not found');
    }
  }
  
  private formatPokemon(pokemon: Pokemons): PokemonByName {
    if (!pokemon || !pokemon.name || !pokemon.types || !pokemon.abilities) {
        throw new NotFoundException('Invalid Pokemon data');
    }
    return {
        name: pokemon.name,
        types: pokemon.types.map(type => type.type.name),
        abilities: pokemon.abilities.map(ability => ability.ability.name),
    };
}

  private async getPokemonListByType(type: string): Promise<string> {
    try {
      const typeData = await this.customHttpService.get<{ results: { name: string; url: string }[] }>('type');
      const typeUrl = typeData.results.find(typeData => typeData.name === type).url
      if (!typeUrl) throw new NotFoundException(`Type ${type} not found`);

      const TypeId = this.extractNumberFromUrl(typeUrl);
      if(!TypeId) throw new NotFoundException(`Type ${type} not found`);
      return TypeId
    }
    catch (error) {
      console.log(`Error: getPokemonListByType - ${error}`, getFormattedDate());
      throw new NotFoundException('Pokemon list by type not found');
    }
  }


  private extractNumberFromUrl = (url: string): string => {
    const match = url.match(/\/(\d+)\/$/);
    return match ? match[1] : '';
  }
}
