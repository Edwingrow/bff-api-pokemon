import { ApiProperty } from '@nestjs/swagger';
export class Pokemon {
  @ApiProperty({
    description: 'Name of the pokemon',
    example: 'charizard',
  })
  name: string;

  @ApiProperty({
    description: 'Front image of the pokemon',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  })
  frontImage: string;

  @ApiProperty({
    description: 'Types of the pokemon',
    example: ['fire', 'flying'],
  })
  types: string[];

  @ApiProperty({
    description: 'Number of abilities',
    example: 2,
  })
  numberOfAbilities: number;

  @ApiProperty({
    description: 'Abilities of the pokemon',
    example: ['blaze', 'solar-power'],
  })
  abilities: string[];

  @ApiProperty({
    description: 'Number of moves',
    example: 2,
  })
  NumberOfMoves: number;

  @ApiProperty({
    description: 'Moves of the pokemon',
    example: ['mega-punch', 'fire-punch'],
  })
  moves: string[];
}
