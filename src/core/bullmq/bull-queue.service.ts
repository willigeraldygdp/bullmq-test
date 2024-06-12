import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import {Job, Queue} from 'bullmq';

@Injectable()
export class BullQueueService {
    constructor(@InjectQueue('my-queue') private readonly myQueue: Queue) {}

    async addSyncEmployeeJob(data: any) {
        await this.myQueue.add('sync-employee', data);
    }

    async addPushEmployeeJob(data: any) {
        await this.myQueue.add('push-employee', data);
    }

    async addErrorJob() {
        await this.myQueue.add('error-job', {});
    }

    async getJob(queueName: string, jobId: string): Promise<Job | null> {
        return this.myQueue.getJob(jobId);
    }
}
