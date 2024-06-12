import { QueueEventsListener, QueueEventsHost, OnQueueEvent } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { BullQueueService } from './bull-queue.service';

@Injectable()
@QueueEventsListener('my-queue')
export class MyQueueListener extends QueueEventsHost {
    private readonly logger = new Logger(MyQueueListener.name);

    constructor(private readonly bullQueueService: BullQueueService) {
        super();
    }

    @OnQueueEvent('failed')
    async onFailed({ jobId, failedReason }: { jobId: string; failedReason: string }) {
        const job = await this.bullQueueService.getJob('my-queue', jobId);
        const jobName = job?.name || 'unknown';
        this.logger.error(`Job ${jobName} (${jobId}) failed: ${failedReason}`);
    }

    @OnQueueEvent('error')
    onError(error: Error) {
        this.logger.error(`Queue error: ${error.message}`, error.stack);
    }

    @OnQueueEvent('stalled')
    async onStalled({ jobId }: { jobId: string }) {
        const job = await this.bullQueueService.getJob('my-queue', jobId);
        const jobName = job?.name || 'unknown';
        this.logger.warn(`Job ${jobName} (${jobId}) stalled`);
    }
}