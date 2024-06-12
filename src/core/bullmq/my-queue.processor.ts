import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import {PushEmployeeService} from "../job/push-employee/push-employee.service";
import {SyncEmployeeService} from "../job/sync-employee/sync-employee.service";

@Injectable()
@Processor('my-queue')
export class MyQueueProcessor extends WorkerHost {
    constructor(
        private readonly syncEmployeeService: SyncEmployeeService,
        private readonly pushEmployeeService: PushEmployeeService,
    ) {
        super();
    }

    async process(job: Job<any>): Promise<void> {
        switch (job.name) {
            case 'sync-employee':
                await this.syncEmployeeService.run(job.data);
                break;
            case 'push-employee':
                await this.pushEmployeeService.run(job.data);
                break;
            case 'error-job':
                throw new Error('Intentional error for testing purposes');
            default:
                console.log('Skipping job:', job.name);
        }
    }
}
