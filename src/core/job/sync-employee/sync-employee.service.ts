import { Injectable } from '@nestjs/common';

@Injectable()
export class SyncEmployeeService {
    async run(data: any): Promise<void> {
        // Your sync employee logic here
        console.log('SyncEmployeeService running with data:', data);
    }
}
