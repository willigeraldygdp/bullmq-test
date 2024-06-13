// bullmq.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullQueueService } from './bull-queue.service';
import {BullmqController} from "./bullmq.controller";
import {SyncEmployeeService} from "../job/sync-employee/sync-employee.service";
import {PushEmployeeService} from "../job/push-employee/push-employee.service";
import {MyQueueProcessor} from "./my-queue.processor";
import {MyQueueListener} from "./my-queue.listener";
import {DiscoveryModule} from "@golevelup/nestjs-discovery";
import {TestInjectionService} from "../job/test-injection.service"; // Example service to handle jobs

@Module({
    imports: [
        BullModule.forRoot({
            connection: {
                host: 'localhost',
                port: 6379,
            },
        }),
        BullModule.registerQueue({
            name: 'my-queue',
        }),
        DiscoveryModule
    ],
    providers: [BullQueueService, SyncEmployeeService, PushEmployeeService, MyQueueProcessor, MyQueueListener, TestInjectionService],
    controllers: [BullmqController],
    exports: [BullQueueService],
})
export class BullmqModule {}
