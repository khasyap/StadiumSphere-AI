"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const application_validation_exception_1 = require("../exceptions/application-validation.exception");
const event_application_service_1 = require("./event-application.service");
describe('EventApplicationService', () => {
    const startsAt = new Date('2030-07-18T18:00:00.000Z');
    const endsAt = new Date('2030-07-18T20:00:00.000Z');
    const scheduledEvent = new domain_1.Event({ name: 'Championship Final', status: domain_1.EventStatus.SCHEDULED, timeSlot: new domain_1.TimeSlot(startsAt, endsAt) }, new domain_1.UniqueEntityId('event-1'));
    const repository = {
        create: jest.fn(async (entity) => entity),
        delete: jest.fn(async (_id) => undefined),
        existsByTimeSlot: jest.fn(async (_timeSlot) => false),
        findAll: jest.fn(async () => [scheduledEvent]),
        findById: jest.fn(async (_id) => scheduledEvent),
        update: jest.fn(async (_id, entity) => entity),
    };
    const service = new event_application_service_1.EventApplicationService(repository);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('schedules only future events with an available time slot', async () => {
        await expect(service.create({ endsAt, name: 'Opening Match', startsAt })).resolves.toMatchObject({
            status: domain_1.EventStatus.SCHEDULED,
        });
        repository.existsByTimeSlot.mockResolvedValueOnce(true);
        await expect(service.create({ endsAt, name: 'Duplicate', startsAt })).rejects.toBeInstanceOf(application_validation_exception_1.ApplicationValidationException);
    });
    it('enforces scheduled, live, finished event transitions', async () => {
        await expect(service.start('event-1')).resolves.toMatchObject({ status: domain_1.EventStatus.LIVE });
        repository.findById.mockResolvedValueOnce(new domain_1.Event({ name: scheduledEvent.toJSON().name, status: domain_1.EventStatus.LIVE, timeSlot: scheduledEvent.toJSON().timeSlot }, scheduledEvent.id));
        await expect(service.finish('event-1')).resolves.toMatchObject({ status: domain_1.EventStatus.FINISHED });
    });
    it('rejects invalid transitions and scheduling in the past', async () => {
        await expect(service.finish('event-1')).rejects.toBeInstanceOf(application_validation_exception_1.ApplicationValidationException);
        await expect(service.create({
            endsAt: new Date('2020-07-18T20:00:00.000Z'),
            name: 'Past Event',
            startsAt: new Date('2020-07-18T18:00:00.000Z'),
        })).rejects.toBeInstanceOf(application_validation_exception_1.ApplicationValidationException);
    });
});
//# sourceMappingURL=event-application.service.spec.js.map