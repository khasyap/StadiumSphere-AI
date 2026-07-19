"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const user_application_service_1 = require("./user-application.service");
describe('UserApplicationService', () => {
    const user = new domain_1.User({ email: new domain_1.Email('fan@example.com') }, new domain_1.UniqueEntityId('user-1'));
    const repository = {
        create: jest.fn(async (entity) => entity),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [user]),
        findByEmail: jest.fn(async (_email) => user),
        findById: jest.fn(async (_id) => user),
        update: jest.fn(async (_id, entity) => entity),
    };
    const service = new user_application_service_1.UserApplicationService(repository);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('coordinates create, read, update, and delete through its repository port', async () => {
        await expect(service.create({ email: 'new@example.com' })).resolves.toMatchObject({
            id: expect.any(String),
        });
        await expect(service.findAll()).resolves.toHaveLength(1);
        await expect(service.findById('user-1')).resolves.toMatchObject({ id: 'user-1' });
        await expect(service.update('user-1', { email: 'updated@example.com' })).resolves.toMatchObject({
            id: 'user-1',
        });
        await expect(service.delete('user-1')).resolves.toBeUndefined();
        expect(repository.create).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(new domain_1.UniqueEntityId('user-1'));
    });
});
//# sourceMappingURL=user-application.service.spec.js.map