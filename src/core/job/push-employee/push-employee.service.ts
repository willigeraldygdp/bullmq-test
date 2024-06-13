import { Injectable } from '@nestjs/common';
import {Job} from "../../bullmq/job.decorator";
import {TestInjectionService} from "../test-injection.service";

@Injectable()
export class PushEmployeeService {
    constructor(private readonly testInjectionService:TestInjectionService) {
    }
    @Job('my-queue', 'push-employee')
    async run(data: any): Promise<void> {
        await this.testInjectionService.haha()
        console.log('PushEmployeeService running with data:', data);
    }
}