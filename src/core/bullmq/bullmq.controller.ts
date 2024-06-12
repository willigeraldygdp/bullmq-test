import { Controller, Post, Body } from '@nestjs/common';
import { BullQueueService } from './bull-queue.service';

@Controller('jobs')
export class BullmqController {
    constructor(private readonly bullQueueService: BullQueueService) {}

    @Post('sync')
    async addSync(@Body() data: any) {
        await this.bullQueueService.addSyncEmployeeJob(data);
        return { message: 'Job added successfully' };
    }

    @Post('push')
    async addPush(@Body() data: any) {
        await this.bullQueueService.addPushEmployeeJob(data);
        return { message: 'Job added successfully' };
    }

    @Post('error')
    async addErrorJob() {
        await this.bullQueueService.addErrorJob();
    }
}
