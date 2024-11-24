import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonType } from './entities/pokemonType.entity';
import { ValidateStringPipe } from './pipes/validate-string-type.pipe';

@ApiTags('Pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('random')
  @ApiResponse({
    status: 200,
    description: 'Return a random pokemon',
    type: Pokemon,
  })
  @ApiResponse({ status: 404, description: ' Pokemon not found' })
  getRandomPokemon() {
    return this.pokemonService.getRandomPokemon();
  }

  @Get('/type/:type')
  @UsePipes(new ValidateStringPipe())
  @ApiResponse({
    status: 200,
    description: 'Return a list of pokemons with their type',
    type: PokemonType,
  })
  @ApiResponse({
    status: 440,
    description: 'Type list not found or Pokemon not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Type must be a string and cannot contain numbers',
  })
  @ApiParam({
    name: 'type',
    description: 'Type of the pokemon',
    example: 'fire',
  })
  getPokemonByType(@Param('type') type: string) {
    return this.pokemonService.getPokemonByType(type.toLowerCase());
  }

  @Get(':name')
  @UsePipes(new ValidateStringPipe())
  @ApiResponse({ status: 200, description: 'Return a pokemon', type: Pokemon })
  @ApiResponse({ status: 404, description: 'Pokemon not found' })
  @ApiResponse({
    status: 400,
    description: 'Type must be a string and cannot contain numbers',
  })
  @ApiParam({
    name: 'name',
    description: 'Name of the pokemon',
    example: 'charizard',
  })
  getPokemonByName(@Param('name') name: string) {
    return this.pokemonService.getPokemonByName(name);
  }

  
}
