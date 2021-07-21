import { PrismaClient } from '@prisma/client'
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

class PrismaService {

    prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }
    
    getPrismaClient() {
        return this.prismaClient;
    }

    disconnectPrismaClient() {
        this.prismaClient.$disconnect();
    }   
}

export default new PrismaService();