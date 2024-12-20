import { Module } from '@nestjs/common';
import { CustomHttpModule } from '../custom-http/custom-http.module';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [CustomHttpModule],
})
export class PokemonModule {}
