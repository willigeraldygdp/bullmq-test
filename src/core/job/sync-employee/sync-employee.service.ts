import { Injectable } from '@nestjs/common';
import {Job} from "../../bullmq/job.decorator";

@Injectable()
export class SyncEmployeeService {
    @Job('my-queue', 'sync-employee')
    async run(data: any): Promise<void> {
        console.log('SyncEmployeeService running with data:', data);
    }
}