import { Module } from "@nestjs/common";
import { AppController } from './app.controller';

@Module({
    // initiate the controller 
    controllers: [AppController]
})
export class AppModule{}
