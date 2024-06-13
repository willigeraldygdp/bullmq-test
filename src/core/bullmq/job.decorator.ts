import { SetMetadata } from '@nestjs/common';

export const JOB_METADATA = 'JOB_METADATA';

export const Job = (queue: string, name: string): MethodDecorator => {
    return (target, propertyKey, descriptor) => {
        SetMetadata(JOB_METADATA, { queue, name })(target, propertyKey, descriptor);
    };
};

export interface JobMetadata {
    queue: string;
    name: string;
}