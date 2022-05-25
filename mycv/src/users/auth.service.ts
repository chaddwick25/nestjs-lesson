import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { sign } from "crypto";
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt); 

// registering the Auth service so it can be used as a dependency
@Injectable()
// AuthService instantiates  usersService with UsersService  
// access to the Users Repo values will be critical to the AuthService methods like signup
// Having acccess to the UsersService CRUD methods make validation within the AuthService seamless 
export class AuthService {
    constructor(private usersService: UsersService){}

    async signup(email: string, password: string){
        const users =  await this.usersService.find(email);
        if(users.length){
            throw new BadRequestException('email in use');
        }
        // converts the 8 bytes buffer to string 
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');
        const user = await this.usersService.create(email, result);
        
        return user;
    }

    async signin(email: string, password: string){
        const [user] = await this.usersService.find(email);
        if (!user){
            throw  new NotFoundException('no user found');
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException('bad password');
        }
        
        return user;
    }
}
