import { Controller, Post, Body, UseGuards  } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from  './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('reports')
export class ReportsController {

    constructor(private reportsService: ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
        // body contains the car details for the creation of the new report
        // user is used for the associations (foriegn key)
        return this.reportsService.create(body, user);
    }
}
