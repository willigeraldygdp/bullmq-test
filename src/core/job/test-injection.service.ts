import { Injectable } from '@nestjs/common';

export class TestInjectionService {
    async haha(): Promise<void> {
        console.log('Test Injection haha');
    }
}