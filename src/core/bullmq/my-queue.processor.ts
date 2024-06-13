import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { DiscoveryService } from '@golevelup/nestjs-discovery';
import {JOB_METADATA, JobMetadata} from './job.decorator';

@Injectable()
@Processor('my-queue')
export class MyQueueProcessor extends WorkerHost implements OnModuleInit {
    private jobHandlers: { [key: string]: Function } = {};
    private readonly logger = new Logger(MyQueueProcessor.name);

    constructor(
        private readonly discoveryService: DiscoveryService,
    ) {
        super();
    }

    async onModuleInit() {
        const methods = await this.discoveryService.providerMethodsWithMetaAtKey<JobMetadata>(JOB_METADATA);

        methods.forEach(({ discoveredMethod, meta }) => {
            const { handler, parentClass } = discoveredMethod;
            const instance = parentClass.instance;

            this.jobHandlers[`${meta.queue}-${meta.name}`] = handler.bind(instance);
        });

        this.logger.log('Job handlers initialized', JSON.stringify(Object.keys(this.jobHandlers)));
    }

    async process(job: Job<any>): Promise<void> {
        const handler = this.jobHandlers[`my-queue-${job.name}`];

        if (handler) {
            await handler(job.data);
        } else {
            this.logger.warn(`No handler found for job: my-queue-${job.name}`);
        }
    }
}
