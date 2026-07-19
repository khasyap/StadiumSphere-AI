"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const application_validation_exception_1 = require("../exceptions/application-validation.exception");
const sport_application_service_1 = require("./sport-application.service");
describe('SportApplicationService', () => {
    const sport = new domain_1.Sport({ name: 'Football' }, new domain_1.UniqueEntityId('sport-1'));
    const repository = {
        create: jest.fn(async (entity) => entity),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [sport]),
        findById: jest.fn(async (_id) => sport),
        update: jest.fn(async (_id, entity) => entity),
    };
    const teamRepository = {
        create: jest.fn(async (entity) => entity),
        delete: jest.fn(async (_id) => undefined),
        existsBySportId: jest.fn(async (_sportId) => false),
        findAll: jest.fn(async () => []),
        findById: jest.fn(async (_id) => null),
        update: jest.fn(async (_id, entity) => entity),
    };
    const service = new sport_application_service_1.SportApplicationService(repository, teamRepository);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('coordinates create, read, update, and delete through its repository port', async () => {
        await expect(service.create({ name: 'Cricket' })).resolves.toMatchObject({ id: expect.any(String) });
        await expect(service.findAll()).resolves.toHaveLength(1);
        await expect(service.findById('sport-1')).resolves.toMatchObject({ id: 'sport-1' });
        await expect(service.update('sport-1', { name: 'Association Football' })).resolves.toMatchObject({
            id: 'sport-1',
        });
        await expect(service.delete('sport-1')).resolves.toBeUndefined();
        expect(repository.create).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(new domain_1.UniqueEntityId('sport-1'));
    });
    it('prevents deletion while Teams reference the Sport', async () => {
        jest.mocked(teamRepository.existsBySportId).mockResolvedValueOnce(true);
        await expect(service.delete('sport-1')).rejects.toBeInstanceOf(application_validation_exception_1.ApplicationValidationException);
    });
});
//# sourceMappingURL=sport-application.service.spec.js.map