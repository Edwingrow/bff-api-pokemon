import { Module } from '@nestjs/common';
import { CustomHttpModule } from './custom-http/custom-http.module';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { CacheConfigModule } from './cache-config/cache-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PokemonModule, 
    CacheConfigModule, 
    CustomHttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
