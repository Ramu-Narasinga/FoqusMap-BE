"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default('app:mongoose-service');
class PrismaService {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
    }
    getPrismaClient() {
        return this.prismaClient;
    }
}
exports.default = new PrismaService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpc21hLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvcHJpc21hLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQ0FBNkM7QUFDN0Msa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixlQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUUzRCxNQUFNLGFBQWE7SUFJZjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxxQkFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELGVBQWU7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztDQUNKO0FBRUQsa0JBQWUsSUFBSSxhQUFhLEVBQUUsQ0FBQyJ9