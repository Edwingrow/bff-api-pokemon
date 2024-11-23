import { Module } from '@nestjs/common';
import { PokemonsModule } from './pokemons/pokemons.module';
import { CacheModule } from './cache/cache.module';
import { CustomHttpModule } from './custom-http/custom-http.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PokemonsModule, 
    CacheModule, 
    CustomHttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
