"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventApplicationService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const application_entity_not_found_exception_1 = require("../exceptions/application-entity-not-found.exception");
const application_validation_exception_1 = require("../exceptions/application-validation.exception");
const application_repository_interface_1 = require("../interfaces/application-repository.interface");
const crud_application_service_1 = require("./crud-application.service");
let EventApplicationService = class EventApplicationService extends crud_application_service_1.CrudApplicationService {
    eventRepository;
    constructor(eventRepository) {
        super(eventRepository);
        this.eventRepository = eventRepository;
    }
    async create(command) {
        const timeSlot = this.createTimeSlot(command.startsAt, command.endsAt);
        await this.ensureScheduleAvailable(timeSlot);
        return super.create(command);
    }
    async update(id, command) {
        const event = await this.getEvent(id);
        const current = event.toJSON();
        if (command.startsAt !== undefined || command.endsAt !== undefined) {
            const timeSlot = this.createTimeSlot(command.startsAt ?? current.timeSlot.startsAt, command.endsAt ?? current.timeSlot.endsAt);
            if (timeSlot.startsAt.getTime() !== current.timeSlot.startsAt.getTime() ||
                timeSlot.endsAt.getTime() !== current.timeSlot.endsAt.getTime()) {
                await this.ensureScheduleAvailable(timeSlot);
            }
        }
        return super.update(id, command);
    }
    async start(id) {
        return this.transition(id, domain_1.EventStatus.SCHEDULED, domain_1.EventStatus.LIVE, 'start');
    }
    async finish(id) {
        return this.transition(id, domain_1.EventStatus.LIVE, domain_1.EventStatus.FINISHED, 'finish');
    }
    async cancel(id) {
        return this.transition(id, domain_1.EventStatus.SCHEDULED, domain_1.EventStatus.CANCELLED, 'cancel');
    }
    createEntity(command) {
        return new domain_1.Event({
            name: command.name,
            status: domain_1.EventStatus.SCHEDULED,
            timeSlot: new domain_1.TimeSlot(command.startsAt, command.endsAt),
        });
    }
    updateEntity(current, command) {
        const event = current.toJSON();
        return new domain_1.Event({
            name: command.name ?? event.name,
            status: current.status,
            timeSlot: new domain_1.TimeSlot(command.startsAt ?? event.timeSlot.startsAt, command.endsAt ?? event.timeSlot.endsAt),
        }, current.id);
    }
    createTimeSlot(startsAt, endsAt) {
        const timeSlot = new domain_1.TimeSlot(startsAt, endsAt);
        if (timeSlot.startsAt.getTime() <= Date.now()) {
            throw new application_validation_exception_1.ApplicationValidationException('Events cannot be scheduled in the past.');
        }
        return timeSlot;
    }
    async ensureScheduleAvailable(timeSlot) {
        if (await this.eventRepository.existsByTimeSlot(timeSlot)) {
            throw new application_validation_exception_1.ApplicationValidationException('An event is already scheduled for this time slot.');
        }
    }
    async getEvent(id) {
        const event = await this.eventRepository.findById(new domain_1.UniqueEntityId(id));
        if (event === null) {
            throw new application_entity_not_found_exception_1.ApplicationEntityNotFoundException(id);
        }
        return event;
    }
    async transition(id, expected, next, action) {
        const event = await this.getEvent(id);
        if (event.status !== expected) {
            throw new application_validation_exception_1.ApplicationValidationException(`Event cannot ${action} from ${event.status}.`);
        }
        const updated = await this.eventRepository.update(event.id, new domain_1.Event({ name: event.toJSON().name, status: next, timeSlot: event.toJSON().timeSlot }, event.id));
        return updated.toJSON();
    }
};
exports.EventApplicationService = EventApplicationService;
exports.EventApplicationService = EventApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(application_repository_interface_1.EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], EventApplicationService);
//# sourceMappingURL=event-application.service.js.map