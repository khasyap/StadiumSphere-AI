"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const organization_dto_1 = require("../dto/organization.dto");
const organization_controller_1 = require("./organization.controller");
describe('OrganizationController', () => {
    const service = {
        create: jest.fn(async (_command) => ({ id: 'organization-1' })),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [{ id: 'organization-1' }]),
        findById: jest.fn(async (_id) => ({ id: 'organization-1' })),
        update: jest.fn(async (_id, _command) => ({ id: 'organization-1' })),
    };
    const controller = new organization_controller_1.OrganizationController(service);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('delegates reads to the application service and wraps the response', async () => {
        await expect(controller.list()).resolves.toEqual({
            success: true,
            message: 'Organization list retrieved.',
            data: [{ id: 'organization-1' }],
        });
        await expect(controller.getById('organization-1')).resolves.toMatchObject({ success: true });
        expect(service.findAll).toHaveBeenCalledTimes(1);
        expect(service.findById).toHaveBeenCalledWith('organization-1');
    });
    it('delegates commands without mapping or persistence access', async () => {
        const create = Object.assign(new organization_dto_1.CreateOrganizationDto(), { name: 'StadiumSphere Sports' });
        const update = Object.assign(new organization_dto_1.UpdateOrganizationDto(), { name: 'StadiumSphere Operations' });
        await controller.create(create);
        await controller.update('organization-1', update);
        await controller.delete('organization-1');
        expect(service.create).toHaveBeenCalledWith(create);
        expect(service.update).toHaveBeenCalledWith('organization-1', update);
        expect(service.delete).toHaveBeenCalledWith('organization-1');
    });
});
//# sourceMappingURL=organization.controller.spec.js.map