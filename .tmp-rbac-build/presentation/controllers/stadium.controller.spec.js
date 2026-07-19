"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const roles_decorator_1 = require("../decorators/roles.decorator");
const stadium_controller_1 = require("./stadium.controller");
const stadium_dto_1 = require("../dto/stadium.dto");
describe('StadiumController', () => {
    const service = {
        create: jest.fn(async (_command) => ({ id: 'stadium-1' })),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [{ id: 'stadium-1' }]),
        findById: jest.fn(async (_id) => ({ id: 'stadium-1' })),
        update: jest.fn(async (_id, _command) => ({ id: 'stadium-1' })),
    };
    const controller = new stadium_controller_1.StadiumController(service);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('delegates reads to the application service and wraps the response', async () => {
        await expect(controller.list()).resolves.toEqual({
            success: true,
            message: 'Stadium list retrieved.',
            data: [{ id: 'stadium-1' }],
        });
        await expect(controller.getById('stadium-1')).resolves.toMatchObject({ success: true });
        expect(service.findAll).toHaveBeenCalledTimes(1);
        expect(service.findById).toHaveBeenCalledWith('stadium-1');
    });
    it('delegates commands without mapping or persistence access', async () => {
        const create = Object.assign(new stadium_dto_1.CreateStadiumDto(), { capacity: 50000, name: 'StadiumSphere Arena' });
        const update = Object.assign(new stadium_dto_1.UpdateStadiumDto(), { capacity: 55000, name: 'Updated Stadium' });
        await controller.create(create);
        await controller.update('stadium-1', update);
        await controller.delete('stadium-1');
        expect(service.create).toHaveBeenCalledWith(create);
        expect(service.update).toHaveBeenCalledWith('stadium-1', update);
        expect(service.delete).toHaveBeenCalledWith('stadium-1');
    });
    it('declares representative authorization roles without changing controller delegation', () => {
        expect(Reflect.getMetadata(roles_decorator_1.ROLES_KEY, stadium_controller_1.StadiumController.prototype.list)).toEqual([
            domain_1.UserRole.ADMIN,
            domain_1.UserRole.MANAGER,
            domain_1.UserRole.STAFF,
            domain_1.UserRole.USER,
        ]);
        expect(Reflect.getMetadata(roles_decorator_1.ROLES_KEY, stadium_controller_1.StadiumController.prototype.create)).toEqual([
            domain_1.UserRole.ADMIN,
            domain_1.UserRole.MANAGER,
        ]);
        expect(Reflect.getMetadata(roles_decorator_1.ROLES_KEY, stadium_controller_1.StadiumController.prototype.delete)).toEqual([domain_1.UserRole.ADMIN]);
    });
});
//# sourceMappingURL=stadium.controller.spec.js.map