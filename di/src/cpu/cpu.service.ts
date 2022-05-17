import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class CpuService {
    // the chaining of services  calling the PowerSupply to the CPUService
    // remember to register the depencies 
    constructor(private powerService:PowerService){}
    compute(a: number, b: number ){
        console.log('Drawing 10 watts of power from the Power Service');
        this.powerService.supplyPower(10);
        return a + b;
    }
}   
