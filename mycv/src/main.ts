import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession: any = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['password']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      // only allows define DTO to be posted 
      // useful for injection attacks 
      whitelist: true,
    })
  )
  await app.listen(3000);
}
bootstrap();
