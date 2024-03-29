import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';


@Injectable()
export class ReportsService {
    // intiates the the report service by using the Report enitity as a DTO 
    // @InjectRepository casts the variable "repo" as  typeorm using the data structure from the Report DTO
    constructor(@InjectRepository(Report) private repo: Repository<Report>){
    }

    createEstimate({make, model, lng, lat, year, mileage }: GetEstimateDto){
    // createEstimate(estimateDto: GetEstimateDto){
        return this.repo
        .createQueryBuilder()
        .select('AVG(price)', 'price')
        // using a DTO instead of recieved query string prevents sql injection attack 
        // .where('make =: make', {make: estimateDto.make})
        .where('make = :make', {make})
        .andWhere('model = :model', {model})
        .andWhere('lng - :lng BETWEEN -5 AND 5', {lng})
        .andWhere('lat - :lat BETWEEN -5 AND 5', {lat})
        .andWhere('year - :year BETWEEN -3 AND 3', {year})
        .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({mileage})
        .limit(3)
        .getRawMany();  
    }

    create(reportDto: CreateReportDto, user: User){
        const report = this.repo.create(reportDto);
        // current user thats signed in 
        report.user = user;
        return this.repo.save(report);
    }

    async changeApproval(id: string, approved: boolean){
        const report = await this.repo.findOne(id)
        if (!report){
            throw new NotFoundException('report not found');
        }

        report.approved = approved;
        return  this.repo.save(report)
    }

}
