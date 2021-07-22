"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_service_1 = __importDefault(require("../../common/services/prisma.service"));
const users_dao_helper_1 = require("../../common/services/users-dao-helper");
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default('app:in-memory-dao');
class UsersDao {
    constructor() {
        this.users = [];
        this.User = prisma_service_1.default.getPrismaClient().user;
        log('Created new instance of UsersDao');
    }
    addUser(userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName = "", lastName = "", email, password } = userFields;
            const user = yield this.User.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password
                }
            });
            return user.id;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findUnique({
                where: {
                    email: email
                },
                select: users_dao_helper_1.getUserSelectable()
            });
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findUnique({
                where: {
                    id: userId
                },
                select: users_dao_helper_1.getUserSelectable()
            });
        });
    }
    updateUserById(userId, userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            // delete id from userFields in put or patch 
            delete userFields.id;
            const existingUser = yield this.User.update({
                where: {
                    id: userId,
                },
                data: Object.assign({}, userFields),
            });
            return existingUser;
        });
    }
    removeUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.delete({
                where: {
                    id: userId
                }
            });
        });
    }
    getUserByEmailWithPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findUnique({
                where: {
                    email: email,
                },
                select: {
                    email: true,
                    password: true,
                },
            });
        });
    }
}
exports.default = new UsersDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdXNlcnMvZGFvcy91c2Vycy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSwwRkFBaUU7QUFDakUsNkVBQTJFO0FBQzNFLGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBb0IsZUFBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFeEQsTUFBTSxRQUFRO0lBS1Y7UUFKQSxVQUFLLEdBQXlCLEVBQUUsQ0FBQztRQUVqQyxTQUFJLEdBQUcsd0JBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFHeEMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVLLE9BQU8sQ0FBQyxVQUF5Qjs7WUFFbkMsTUFBTSxFQUNGLFNBQVMsR0FBQyxFQUFFLEVBQ1osUUFBUSxHQUFDLEVBQUUsRUFDWCxLQUFLLEVBQ0wsUUFBUSxFQUNYLEdBQUcsVUFBVSxDQUFBO1lBRWQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDaEMsSUFBSSxFQUFFO29CQUNGLFNBQVM7b0JBQ1QsUUFBUTtvQkFDUixLQUFLO29CQUNMLFFBQVE7aUJBQ1g7YUFDSixDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbkIsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLEtBQWE7O1lBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ3hCLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsS0FBSztpQkFDZjtnQkFDRCxNQUFNLEVBQUUsb0NBQWlCLEVBQUU7YUFDOUIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0lBRUssV0FBVyxDQUFDLE1BQWM7O1lBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ3hCLEtBQUssRUFBRTtvQkFDSCxFQUFFLEVBQUUsTUFBTTtpQkFDYjtnQkFDRCxNQUFNLEVBQUUsb0NBQWlCLEVBQUU7YUFDOUIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUNoQixNQUFjLEVBQ2QsVUFBcUM7O1lBR3JDLDZDQUE2QztZQUM3QyxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDckIsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDeEMsS0FBSyxFQUFFO29CQUNILEVBQUUsRUFBRSxNQUFNO2lCQUNiO2dCQUNELElBQUksb0JBQ0csVUFBVSxDQUNoQjthQUNKLENBQUMsQ0FBQztZQUVILE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBQyxNQUFjOztZQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNwQixLQUFLLEVBQUU7b0JBQ0gsRUFBRSxFQUFFLE1BQU07aUJBQ2I7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7SUFFSywwQkFBMEIsQ0FBQyxLQUFhOztZQUMxQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUN4QixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLEtBQUs7aUJBQ2I7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLEtBQUssRUFBRSxJQUFJO29CQUNYLFFBQVEsRUFBRSxJQUFJO2lCQUNmO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0NBQ0o7QUFFRCxrQkFBZSxJQUFJLFFBQVEsRUFBRSxDQUFDIn0=