import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const config = new DocumentBuilder()
  .setTitle('BFF Api Pokemon')
  .setDescription(`This is Pokemon API'S Documentation `)
  .setVersion('1.0')
  .build();

const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('public/api/v1', app, documentFactory);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
