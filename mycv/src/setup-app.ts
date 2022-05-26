import { ValidationPipe } from '@nestjs/common';
const cookieSession: any = require('cookie-session');


export const setupApp = (app: any) =>{
    app.use(cookieSession({
        keys: ['password']
      }))
      app.useGlobalPipes(
        new ValidationPipe({
          // only allows define DTO to be posted 
          // useful for injection attacks 
          whitelist: true,
        })
      );
}