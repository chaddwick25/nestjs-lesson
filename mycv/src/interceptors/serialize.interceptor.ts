import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';


interface ClassConstructor{
    new(...args: any[]): {} 
}


export function Serialize(dto: ClassConstructor){
    return  UseInterceptors(new SerializeInterceptor(dto)); 
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any){}

    intercept(context : ExecutionContext, handler: CallHandler): Observable<any>{
        // preprocessing of http request before the request is passed on to the route handler starts here 
        // the request is incepted, then serialized/authenticated thust the name interceptor   
        // console.log('I am running before the handler');

        return handler.handle().pipe(
            map((data:any) =>{
                 // casting to UserDto with plainToClass with excludeExtraneousValues:true,
                 return plainToClass(this.dto, data,{
                     // will only expose the properties on the that are explicitly defined in the UserDto
                     excludeExtraneousValues:true,
                 });
                // console.log('Im running before response is sent out',data)
            })
        )
    }
}
