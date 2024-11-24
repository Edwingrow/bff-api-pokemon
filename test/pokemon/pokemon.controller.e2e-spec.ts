import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

describe('PokemonController TEST e2e ', () => {
    let app: INestApplication;
    let cacheManager: Cache;
    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
    
        app = moduleFixture.createNestApplication();
        await app.init();
        cacheManager = app.get<Cache>(CACHE_MANAGER); 
     
      });
      

       const clearCache = async () => {
            await cacheManager.reset()
        }

      it('/pokemon/random', async () => {
        const response = await request(app.getHttpServer())
          .get('/pokemon/random')
          .expect(200);
        
          expect(response.body).toHaveProperty('name');
          expect(response.body).toHaveProperty('types');
          expect(response.body.types).toEqual(expect.any(Array));
          expect(response.body.abilities).toEqual(expect.any(Array));
          expect(response.body.numberOfAbilities).toEqual(expect.any(Number));
          expect(response.body.frontImage).toEqual(expect.any(String));
          expect(response.body.moves).toEqual(expect.any(Array));
          expect(response.body.NumberOfMoves).toEqual(expect.any(Number));
      });


    
      it('/pokemon/type/:type ', async () => {
        const type = 'fire';
        const response = await request(app.getHttpServer())
          .get(`/pokemon/type/${type}`)
          .expect(200);
        
        expect(response.body).toEqual(expect.any(Array));
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('type');
        expect(response.body[0].type).toEqual('fire');
      });

      it('/pokemon/type/:type - should return 400 because the parameter include a number', async () => {
        const type = 'fire1';
        await request(app.getHttpServer())
        .get(`/pokemon/type/${type}`)
        .expect(400);
      });

      it('/pokemon/type/:type - should return 404 for incorrect parameter ', async () => {
          const type = 'IncorrectType';
          await request(app.getHttpServer())
          .get(`/pokemon/type/${type}`)
          .expect(404);
      });




        it('/pokemon/:name ', async () => {
            const response = await request(app.getHttpServer())
            .get('/pokemon/charizard')
            .expect(200);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('types');
            expect(response.body.types).toEqual(expect.any(Array));
            expect(response.body.abilities).toEqual(expect.any(Array));
            expect(response.body.numberOfAbilities).toEqual(expect.any(Number));
            expect(response.body.frontImage).toEqual(expect.any(String));
            expect(response.body.moves).toEqual(expect.any(Array));
            expect(response.body.NumberOfMoves).toEqual(expect.any(Number));
        });

        it('/pokemon/:name - should return 400 because the parameter include a number', async () => {
            await request(app.getHttpServer())
            .get('/pokemon/charizard1')
            .expect(400);
        });

        it('/pokemon/:name - should return 404 for incorrect parameter ', async () => {
            await request(app.getHttpServer())
            .get('/pokemon/IncorrectPokemon')
            .expect(404);
        });

       
    afterEach(async () => {
        await clearCache();
    });
      afterAll(async () => {
        await app.close();
      });

      
});
