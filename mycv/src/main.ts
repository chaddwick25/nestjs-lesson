import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession: any = require('cookie-session');
import { setupApp } from './setup-app' ;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApp(app);
  await app.listen(3000);
}
bootstrap();
