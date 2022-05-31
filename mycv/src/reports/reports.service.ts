import { Injectable } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';


@Injectable()
export class ReportsService {
    // intiates the the report service by using the Report enitity as a DTO 
    // @InjectRepository casts the variable "repo" as  typeorm using the data structure from the Report DTO
    constructor(@InjectRepository(Report) private repo: Repository<Report>){
    }

    create(reportDto: CreateReportDto){
        const report = this.repo.create(reportDto);
        
        return this.repo.save(report);
    }

}
