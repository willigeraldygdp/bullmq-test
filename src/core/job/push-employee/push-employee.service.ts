import { Injectable } from '@nestjs/common';

@Injectable()
export class PushEmployeeService {
    async run(data: any): Promise<void> {
        // Your push employee logic here
        console.log('PushEmployeeService running with data:', data);
    }
}
