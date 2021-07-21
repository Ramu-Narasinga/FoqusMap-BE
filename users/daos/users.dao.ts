import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import prismaService from '../../common/services/prisma.service';
import { getUserSelectable } from '../../common/services/users-dao-helper';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    users: Array<CreateUserDto> = [];

    User = prismaService.getPrismaClient().user;

    constructor() {
        log('Created new instance of UsersDao');
    }

    async addUser(userFields: CreateUserDto) {

        const {
            firstName="",
            lastName="",
            email,
            password
        } = userFields

        const user = await this.User.create({
            data: {
                firstName,
                lastName,
                email,
                password
            }
        });
        return user.id;
    }

    async getUserByEmail(email: string) {
        return this.User.findUnique({
            where: { 
                email: email 
            },
            select: getUserSelectable()
        });
    }
    
    async getUserById(userId: number) {
        return this.User.findUnique({
            where: { 
                id: userId 
            },
            select: getUserSelectable()
        });
    }

    async updateUserById(
        userId: number,
        userFields: PatchUserDto | PutUserDto
    ) {

        // delete id from userFields in put or patch 
        delete userFields.id;
        const existingUser = await this.User.update({
            where: {
                id: userId,
            },
            data: {
                ...userFields
            },
        });
    
        return existingUser;
    }

    async removeUserById(userId: number) {
        return this.User.delete({ 
            where: {
                id: userId 
            }
        });
    }

    async getUserByEmailWithPassword(email: string) {
        return this.User.findUnique({
            where: {
              email: email,
            },
            select: {
              email: true,
              password: true,
            },
        });
    }
}

export default new UsersDao();

