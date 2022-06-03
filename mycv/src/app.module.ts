import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { Config } from 'prettier';
const cookieSession: any = require('cookie-session');


@Module({
  //TypeOrm will create a 'db.sqlite' file within the root dir
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    ReportsModule
  ],
  controllers: [AppController],
  // globally scoped validation pipe 
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      })
    }
  ],
})
export class AppModule {
  // globally scoped middleware
  constructor(
    private configService: ConfigService
  ){}
  configure(consumer: MiddlewareConsumer){
      consumer.apply(cookieSession({
    // setting up a COOKIE env variable via NestJs ConfigService
    keys: [this.configService.get('COOKIE_KEY')]
      }),
    ).forRoutes('*');
  }
}
