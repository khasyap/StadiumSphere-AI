"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_dto_1 = require("../dto/user.dto");
const user_controller_1 = require("./user.controller");
describe('UserController', () => {
    const service = {
        create: jest.fn(async (_command) => ({ id: 'user-1' })),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [{ id: 'user-1' }]),
        findById: jest.fn(async (_id) => ({ id: 'user-1' })),
        update: jest.fn(async (_id, _command) => ({ id: 'user-1' })),
    };
    const controller = new user_controller_1.UserController(service);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('delegates reads to the application service and wraps the response', async () => {
        await expect(controller.list()).resolves.toEqual({
            success: true,
            message: 'User list retrieved.',
            data: [{ id: 'user-1' }],
        });
        await expect(controller.getById('user-1')).resolves.toMatchObject({ success: true });
        expect(service.findAll).toHaveBeenCalledTimes(1);
        expect(service.findById).toHaveBeenCalledWith('user-1');
    });
    it('delegates commands without mapping or persistence access', async () => {
        const create = Object.assign(new user_dto_1.CreateUserDto(), { email: 'fan@example.com' });
        const update = Object.assign(new user_dto_1.UpdateUserDto(), { email: 'supporter@example.com' });
        await controller.create(create);
        await controller.update('user-1', update);
        await controller.delete('user-1');
        expect(service.create).toHaveBeenCalledWith(create);
        expect(service.update).toHaveBeenCalledWith('user-1', update);
        expect(service.delete).toHaveBeenCalledWith('user-1');
    });
});
//# sourceMappingURL=user.controller.spec.js.map