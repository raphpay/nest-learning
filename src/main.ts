import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // supprime les champs non définis dans le DTO
      forbidNonWhitelisted: true, // renvoie une erreur si champ non attendu
      transform: true, // convertit automatiquement les types
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
