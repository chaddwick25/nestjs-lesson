import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInceptor } from './interceptors/current-user.interceptor';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService, 
    CurrentUserInceptor,
    // Globally scoped interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInceptor
    }
  ],
})
export class UsersModule {}
