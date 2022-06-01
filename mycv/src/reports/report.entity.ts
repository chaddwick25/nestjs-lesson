import { 
 Entity,
 Column,
 PrimaryGeneratedColumn, 
 ManyToOne,
} from "typeorm";

import { User } from '../users/user.entity';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    // setting a default column value 
    @Column({default: false })
    approved: boolean;

    @Column()
    price: number;

    @Column()
    model: string;

    @Column()
    make: string;

    @Column()
    year: number;

    @Column()
    lng: number;

    @Column()
    lat: number;

    @Column()
    mileage:number;

    // establishing the foreign key relationship between the User and Reports Enitity
    // the @ManyToOne decorators creates a user_id column in the table #foreign_key
    @ManyToOne(() => User, (user => user.reports))
    user: User;
    
}