"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const application_entity_not_found_exception_1 = require("../exceptions/application-entity-not-found.exception");
const user_mapper_1 = require("../mappers/user.mapper");
const entity_application_service_1 = require("./entity-application.service");
describe('EntityApplicationService', () => {
    const user = new domain_1.User({ email: new domain_1.Email('user@example.com') }, new domain_1.UniqueEntityId('user-1'));
    const mapper = new user_mapper_1.UserMapper();
    const createService = (repository) => new entity_application_service_1.EntityApplicationService(repository, mapper);
    it('coordinates a repository port and mapper to read entities', async () => {
        const repository = {
            create: jest.fn(async (entity) => entity),
            delete: jest.fn(async () => undefined),
            findAll: jest.fn(async () => [user]),
            findById: jest.fn(async () => user),
            update: jest.fn(async (_id, entity) => entity),
        };
        const service = createService(repository);
        await expect(service.findById('user-1')).resolves.toEqual({
            id: 'user-1',
            email: 'user@example.com',
        });
        await expect(service.findAll()).resolves.toEqual([{ id: 'user-1', email: 'user@example.com' }]);
    });
    it('raises an application exception when a repository port has no entity', async () => {
        const repository = {
            create: jest.fn(async (entity) => entity),
            delete: jest.fn(async () => undefined),
            findAll: jest.fn(async () => []),
            findById: jest.fn(async () => null),
            update: jest.fn(async (_id, entity) => entity),
        };
        await expect(createService(repository).findById('missing-user')).rejects.toThrow(application_entity_not_found_exception_1.ApplicationEntityNotFoundException);
    });
});
//# sourceMappingURL=entity-application.service.spec.js.map