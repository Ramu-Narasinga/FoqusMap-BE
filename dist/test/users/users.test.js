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
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const shortid_1 = __importDefault(require("shortid"));
const mongoose_1 = __importDefault(require("mongoose"));
let firstUserIdTest = 0; // will later hold a value returned by our API
const firstUserBody = {
    email: `marcos.henrique+${shortid_1.default.generate()}@toptal.com`,
    password: 'Sup3rSecret!23',
};
let accessToken = '';
let refreshToken = '';
const newFirstName = 'Jose';
const newFirstName2 = 'Paulo';
const newLastName2 = 'Faraco';
describe('users and auth endpoints', function () {
    let request;
    before(function () {
        request = supertest_1.default.agent(app_1.default);
    });
    after(function (done) {
        // shut down the Express.js server, close our MongoDB connection, then
        // tell Mocha we're done:
        app_1.default.close(() => {
            mongoose_1.default.connection.close(done);
        });
    });
    it('should allow a POST to /users', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post('/users').send(firstUserBody);
            chai_1.expect(res.status).to.equal(201);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an('object');
            chai_1.expect(res.body.id).to.be.a('number');
            firstUserIdTest = res.body.id;
        });
    });
    it('should allow a POST to /auth', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post('/auth').send(firstUserBody);
            chai_1.expect(res.status).to.equal(201);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an('object');
            chai_1.expect(res.body.accessToken).to.be.a('string');
            accessToken = res.body.accessToken;
            refreshToken = res.body.refreshToken;
        });
    });
    it('should allow a GET from /users/:userId with an access token', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .get(`/users/${firstUserIdTest}`)
                .set({ Authorization: `Bearer ${accessToken}` })
                .send();
            chai_1.expect(res.status).to.equal(200);
            chai_1.expect(res.body).not.to.be.empty;
            chai_1.expect(res.body).to.be.an('object');
            chai_1.expect(res.body.id).to.be.a('number');
            chai_1.expect(res.body.id).to.equal(firstUserIdTest);
            chai_1.expect(res.body.email).to.equal(firstUserBody.email);
        });
    });
    describe('with a valid access token', function () {
        it('should allow a PATCH to /users/:userId', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .patch(`/users/${firstUserIdTest}`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send({
                    firstName: newFirstName,
                });
                chai_1.expect(res.status).to.equal(204);
            });
        });
        it('should allow a PUT to /users/:userId with an nonexistent ID', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .put(`/users/i-do-not-exist`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send({
                    email: firstUserBody.email,
                    password: firstUserBody.password,
                    firstName: 'Marcos',
                    lastName: 'Silva',
                });
                chai_1.expect(res.status).to.equal(404);
            });
        });
        describe('with a new set of tokens', function () {
            it('should allow a POST to /auth/refresh-token', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield request
                        .post('/auth/refresh-token')
                        .set({ Authorization: `Bearer ${accessToken}` })
                        .send({ refreshToken });
                    chai_1.expect(res.status).to.equal(201);
                    chai_1.expect(res.body).not.to.be.empty;
                    chai_1.expect(res.body).to.be.an('object');
                    chai_1.expect(res.body.accessToken).to.be.a('string');
                    accessToken = res.body.accessToken;
                    refreshToken = res.body.refreshToken;
                });
            });
            it('should allow a PUT to /users/:userId to change first and last names', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield request
                        .put(`/users/${firstUserIdTest}`)
                        .set({ Authorization: `Bearer ${accessToken}` })
                        .send({
                        email: firstUserBody.email,
                        password: firstUserBody.password,
                        firstName: newFirstName2,
                        lastName: newLastName2,
                    });
                    chai_1.expect(res.status).to.equal(204);
                });
            });
            it('should allow a GET from /users/:userId and should have a new full name', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield request
                        .get(`/users/${firstUserIdTest}`)
                        .set({ Authorization: `Bearer ${accessToken}` })
                        .send();
                    chai_1.expect(res.status).to.equal(200);
                    chai_1.expect(res.body).not.to.be.empty;
                    chai_1.expect(res.body).to.be.an('object');
                    chai_1.expect(res.body.id).to.be.a('number');
                    chai_1.expect(res.body.firstName).to.equal(newFirstName2);
                    chai_1.expect(res.body.lastName).to.equal(newLastName2);
                    chai_1.expect(res.body.email).to.equal(firstUserBody.email);
                    chai_1.expect(res.body._id).to.equal(firstUserIdTest);
                });
            });
            it('should allow a DELETE from /users/:userId', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield request
                        .delete(`/users/${firstUserIdTest}`)
                        .set({ Authorization: `Bearer ${accessToken}` })
                        .send();
                    chai_1.expect(res.status).to.equal(204);
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3QvdXNlcnMvdXNlcnMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QiwwREFBa0M7QUFDbEMsK0JBQThCO0FBQzlCLHNEQUE4QjtBQUM5Qix3REFBZ0M7QUFFaEMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUMsOENBQThDO0FBQ3ZFLE1BQU0sYUFBYSxHQUFHO0lBQ2xCLEtBQUssRUFBRSxtQkFBbUIsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsYUFBYTtJQUN6RCxRQUFRLEVBQUUsZ0JBQWdCO0NBQzdCLENBQUM7QUFFRixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDckIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQztBQUM1QixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUM7QUFDOUIsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBRTlCLFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtJQUNqQyxJQUFJLE9BQWlDLENBQUM7SUFDdEMsTUFBTSxDQUFDO1FBQ0gsT0FBTyxHQUFHLG1CQUFTLENBQUMsS0FBSyxDQUFDLGFBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLFVBQVUsSUFBSTtRQUNoQixzRUFBc0U7UUFDdEUseUJBQXlCO1FBQ3pCLGFBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ1gsa0JBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsK0JBQStCLEVBQUU7O1lBQ2hDLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFN0QsYUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2pDLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xDLENBQUM7S0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsOEJBQThCLEVBQUU7O1lBQy9CLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUQsYUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2pDLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFD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