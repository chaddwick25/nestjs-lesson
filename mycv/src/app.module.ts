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
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type:'sqlite',
          database: config.get<string>('DB_NAME'), 
          entities: [User, Report],
          synchronize:true,
        }
      } 
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
      // // non NestJs solution
      // // database: process.env.NODE_ENV === 'test' ? 'test.sqlite' : 'db.sqlite',
    //   entities:[User, Report],
    //   synchronize: true,    
    // }),
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
  configure(consumer: MiddlewareConsumer){
      consumer.apply(cookieSession({
        keys: ['password']
      }),
    ).forRoutes('*');
  }
}
