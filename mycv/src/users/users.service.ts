import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    // The User is coming from the Entity which is table in the DB schema 
    // private variable named repo casts the data type of the Users Table 
    // CRUD methods are wrapped around the repo variable eg findOne, 
    constructor(@InjectRepository(User) private repo: Repository<User>){}
    
    create(email: string, password: string){
        const user = this.repo.create({email, password});
        
        return this.repo.save(user);
    }

    findOne(id: number){
        return this.repo.findOne(id);
    }

    find(email: string){
        return this.repo.find({email});
    }
    
    // DTO for users is used to create a compound type ( Partial + Users) 
    // DTO related attributes/properties of the Users Entity can then be accessed to impliment dynamic conditional checks within the method 
    async update(id: number, attrs: Partial<User>){
         const user = await this.findOne(id);
         if(!user){
             throw new Error('user not found');
         }
         Object.assign(user, attrs);
         return this.repo.save(user);
    }
    async remove(id: number){
        const user = await this.findOne(id);
        if(!user){
            throw new Error('user not found');
        }
        // Updating the Entity triggers the appropriate typeorm hooks(AfterUpdate, AfterRemove, AfterInsert)
        return this.repo.remove(user);
    }

}
