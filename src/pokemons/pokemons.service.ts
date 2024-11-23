import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomHttpService } from 'src/custom-http/custom-http.service';
import { PokemonByName, Pokemons } from './interface/Pokemons.interface';
import { getFormattedDate } from 'src/utils/date.utils';

@Injectable()
export class PokemonsService {
 constructor(
    private readonly customHttpService: CustomHttpService,
 ) {}


  async getPokemonByName(name: string) : Promise<PokemonByName> {
    try {
      const pokemon = await this.customHttpService.get<Pokemons>(`pokemon/${name}`); 

      if (!pokemon || !pokemon.name || !pokemon.types || !pokemon.abilities) {
        throw new NotFoundException(`Pokemon ${name} not found`);
    }
    const pokemonByName: PokemonByName = {
      name: pokemon.name,
      types: pokemon.types.map(type => type.type.name) || [], 
      abilities: pokemon.abilities.map(ability => ability.ability.name) || [],
    };
      return pokemonByName;
    }
    catch (error) {
      console.log(`Error: getPokemonByName - ${error}`, getFormattedDate());
      throw new NotFoundException('Pokemon by name not found');
    }
  }
}
