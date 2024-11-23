import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { CustomHttpModule } from 'src/custom-http/custom-http.module';

@Module({
  controllers: [PokemonsController],
  providers: [PokemonsService],
  imports: [CustomHttpModule],
})
export class PokemonsModule {}
