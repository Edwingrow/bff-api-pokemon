import { Module } from '@nestjs/common';
import { CacheModule } from './cache/cache.module';
import { CustomHttpModule } from './custom-http/custom-http.module';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PokemonModule, 
    CacheModule, 
    CustomHttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
