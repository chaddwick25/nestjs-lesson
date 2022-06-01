import { Injectable } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { User } from '../users/user.entity';


@Injectable()
export class ReportsService {
    // intiates the the report service by using the Report enitity as a DTO 
    // @InjectRepository casts the variable "repo" as  typeorm using the data structure from the Report DTO
    constructor(@InjectRepository(Report) private repo: Repository<Report>){
    }

    create(reportDto: CreateReportDto, user: User){
        const report = this.repo.create(reportDto);
        // current user thats signed in 
        report.user = user;
        return this.repo.save(report);
    }

}
