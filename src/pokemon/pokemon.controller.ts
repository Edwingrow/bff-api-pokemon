import { Controller, Get, Param,  } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('random')
  getRandomPokemon() {
    return this.pokemonService.getRandomPokemon();
  }

  @Get('/type/:type')
  getPokemonByType(@Param('type') type: string) {
    return this.pokemonService.getPokemonByType(type);
  }

  @Get(':name')
  getPokemonByName(@Param('name') name: string) {
    return this.pokemonService.getPokemonByName(name);
  }
 
}
