"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const persistence_1 = require("../persistence");
const event_repository_1 = require("./event.repository");
const startsAt = new Date('2026-07-18T18:00:00.000Z');
const endsAt = new Date('2026-07-18T20:00:00.000Z');
const event = new domain_1.Event({ name: 'Championship Final', timeSlot: new domain_1.TimeSlot(startsAt, endsAt) }, new domain_1.UniqueEntityId('event-1'));
const document = { id: 'event-1', endsAt, name: 'Championship Final', startsAt };
const createModel = () => {
    const collectionQuery = {
        exec: jest.fn().mockResolvedValue([document]),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
    };
    return {
        countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(1) }),
        create: jest.fn().mockResolvedValue(document),
        find: jest.fn().mockReturnValue(collectionQuery),
        findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
        findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
        findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
    };
};
describe('EventRepository', () => {
    it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
        const model = createModel();
        const repository = new event_repository_1.EventRepository(model);
        await expect(repository.create(event)).resolves.toBeInstanceOf(domain_1.Event);
        await expect(repository.findById(new domain_1.UniqueEntityId('event-1'))).resolves.toBeInstanceOf(domain_1.Event);
        await expect(repository.findAll()).resolves.toHaveLength(1);
        await expect(repository.update(new domain_1.UniqueEntityId('event-1'), event)).resolves.toBeInstanceOf(domain_1.Event);
        await expect(repository.delete(new domain_1.UniqueEntityId('event-1'))).resolves.toBeUndefined();
        expect(model.create).toHaveBeenCalledWith({
            endsAt,
            name: 'Championship Final',
            startsAt,
            status: domain_1.EventStatus.SCHEDULED,
        });
    });
    it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
        const model = createModel();
        jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });
        await expect(new event_repository_1.EventRepository(model).create(event)).rejects.toBeInstanceOf(persistence_1.DuplicateEntityException);
    });
});
//# sourceMappingURL=event.repository.spec.js.map