import { 
AfterInsert,
AfterRemove, 
AfterUpdate,
Entity, 
Column, 
PrimaryGeneratedColumn,
OneToMany,
} from  'typeorm';
import { Exclude } from 'class-transformer';
import { Report } from '../reports/report.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    // @Exclude()
    @Column()
    password: string;

    @Column({ default: true })
    admin: boolean;

    @OneToMany(() => Report,(report) => report.user)
    reports: Report[];

    // hook decorator
    @AfterInsert()
    logInsert(){
        console.log('Inserted User with id', this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Updated User with id ', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed user with id ', this.id)
    }

}