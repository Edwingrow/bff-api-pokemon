import { ApiProperty } from '@nestjs/swagger';

export class PokemonType {
    @ApiProperty({
        description: 'Name of Pokemon',
        example: 'charizard'

    })
    name: string;
    
    @ApiProperty({
        description: 'Type of Pokemon',
        example: 'fire'
    })
    type: string;
}