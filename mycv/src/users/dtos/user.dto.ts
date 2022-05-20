import { Expose } from 'class-transformer';
// Exposes the  id, email properties of the DTO to the API 

export class UserDto{
    @Expose()
    id: number;

    @Expose()
    email: string;

}