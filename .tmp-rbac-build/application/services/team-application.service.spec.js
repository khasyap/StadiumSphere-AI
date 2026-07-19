"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const application_entity_not_found_exception_1 = require("../exceptions/application-entity-not-found.exception");
const application_validation_exception_1 = require("../exceptions/application-validation.exception");
const team_application_service_1 = require("./team-application.service");
describe('TeamApplicationService', () => {
    const team = new domain_1.Team({ name: 'StadiumSphere FC', sport: new domain_1.Sport({ name: 'Football' }, new domain_1.UniqueEntityId('sport-1')) }, new domain_1.UniqueEntityId('team-1'));
    const repository = {
        create: jest.fn(async (entity) => entity),
        delete: jest.fn(async (_id) => undefined),
        existsBySportId: jest.fn(async (_sportId) => false),
        findAll: jest.fn(async () => [team]),
        findById: jest.fn(async (_id) => team),
        update: jest.fn(async (_id, entity) => entity),
    };
    const sportRepository = {
        create: jest.fn(async (entity) => entity),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [team.toJSON().sport]),
        findById: jest.fn(async (_id) => team.toJSON().sport),
        update: jest.fn(async (_id, entity) => entity),
    };
    const service = new team_application_service_1.TeamApplicationService(repository, sportRepository);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('coordinates create, read, update, and delete through its repository port', async () => {
        await expect(service.create({ name: 'New Team', sportId: 'sport-1', sportName: 'Football' })).resolves.toMatchObject({ id: expect.any(String) });
        await expect(service.findAll()).resolves.toHaveLength(1);
        await expect(service.findById('team-1')).resolves.toMatchObject({ id: 'team-1' });
        await expect(service.update('team-1', { name: 'Updated Team' })).resolves.toMatchObject({
            id: 'team-1',
        });
        await expect(service.delete('team-1')).resolves.toBeUndefined();
        expect(repository.create).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(new domain_1.UniqueEntityId('team-1'));
    });
    it('rejects a missing Sport reference and inconsistent sport data', async () => {
        jest.mocked(sportRepository.findById).mockResolvedValueOnce(null);
        await expect(service.create({ name: 'New Team', sportId: 'missing-sport', sportName: 'Football' })).rejects.toBeInstanceOf(application_entity_not_found_exception_1.ApplicationEntityNotFoundException);
        await expect(service.create({ name: 'New Team', sportId: 'sport-1', sportName: 'Cricket' })).rejects.toBeInstanceOf(application_validation_exception_1.ApplicationValidationException);
        await expect(service.update('team-1', { sportName: 'Cricket' })).rejects.toBeInstanceOf(application_validation_exception_1.ApplicationValidationException);
    });
});
//# sourceMappingURL=team-application.service.spec.js.map