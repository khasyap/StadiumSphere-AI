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
exports.BookingApplicationService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const application_entity_not_found_exception_1 = require("../exceptions/application-entity-not-found.exception");
const application_validation_exception_1 = require("../exceptions/application-validation.exception");
const application_repository_interface_1 = require("../interfaces/application-repository.interface");
const crud_application_service_1 = require("./crud-application.service");
let BookingApplicationService = class BookingApplicationService extends crud_application_service_1.CrudApplicationService {
    bookingRepository;
    eventRepository;
    constructor(bookingRepository, eventRepository) {
        super(bookingRepository);
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
    }
    async create(command) {
        await this.ensureBookableEvent(command.eventId);
        return super.create(command);
    }
    async update(id, command) {
        const booking = await this.getBooking(id);
        if (booking.status === domain_1.BookingStatus.COMPLETED &&
            (command.eventId !== undefined || command.reference !== undefined)) {
            throw new application_validation_exception_1.ApplicationValidationException('Completed bookings cannot be updated.');
        }
        if (command.eventId !== undefined && command.eventId !== booking.eventId.toString()) {
            await this.ensureBookableEvent(command.eventId);
        }
        return super.update(id, command);
    }
    async confirm(id) {
        const booking = await this.getBooking(id);
        this.ensureTransition(booking.status, domain_1.BookingStatus.PENDING, 'confirm');
        await this.ensureBookableEvent(booking.eventId.toString());
        return this.toWorkflowResponse(await this.persistStatus(booking, domain_1.BookingStatus.CONFIRMED));
    }
    async cancel(id) {
        const booking = await this.getBooking(id);
        if (booking.status !== domain_1.BookingStatus.PENDING && booking.status !== domain_1.BookingStatus.CONFIRMED) {
            throw new application_validation_exception_1.ApplicationValidationException(`Booking cannot be cancelled from ${booking.status}.`);
        }
        return this.toWorkflowResponse(await this.persistStatus(booking, domain_1.BookingStatus.CANCELLED));
    }
    async checkIn(id) {
        const booking = await this.getBooking(id);
        this.ensureTransition(booking.status, domain_1.BookingStatus.CONFIRMED, 'check in');
        return this.toWorkflowResponse(await this.persistStatus(booking, domain_1.BookingStatus.CHECKED_IN));
    }
    async complete(id) {
        const booking = await this.getBooking(id);
        this.ensureTransition(booking.status, domain_1.BookingStatus.CHECKED_IN, 'complete');
        return this.toWorkflowResponse(await this.persistStatus(booking, domain_1.BookingStatus.COMPLETED));
    }
    createEntity(command) {
        return new domain_1.Booking({
            eventId: command.eventId,
            reference: command.reference,
            status: domain_1.BookingStatus.PENDING,
        });
    }
    updateEntity(current, command) {
        return this.withProperties(current, {
            eventId: command.eventId ?? current.eventId.toString(),
            reference: command.reference ?? current.toJSON().reference,
            status: current.status,
        });
    }
    async ensureBookableEvent(eventId) {
        const event = await this.eventRepository.findById(new domain_1.UniqueEntityId(eventId));
        if (event === null) {
            throw new application_entity_not_found_exception_1.ApplicationEntityNotFoundException(eventId);
        }
        if (event.status === domain_1.EventStatus.CANCELLED || event.status === domain_1.EventStatus.FINISHED) {
            throw new application_validation_exception_1.ApplicationValidationException(`Bookings are not available for ${event.status} events.`);
        }
    }
    ensureTransition(current, expected, action) {
        if (current !== expected) {
            throw new application_validation_exception_1.ApplicationValidationException(`Booking cannot ${action} from ${current}.`);
        }
    }
    async getBooking(id) {
        const booking = await this.bookingRepository.findById(new domain_1.UniqueEntityId(id));
        if (booking === null) {
            throw new application_entity_not_found_exception_1.ApplicationEntityNotFoundException(id);
        }
        return booking;
    }
    async persistStatus(booking, status) {
        return this.bookingRepository.update(booking.id, this.withProperties(booking, { status }));
    }
    toWorkflowResponse(booking) {
        return booking.toJSON();
    }
    withProperties(booking, changes) {
        const current = booking.toJSON();
        return new domain_1.Booking({
            eventId: changes.eventId ?? current.eventId,
            reference: changes.reference ?? current.reference,
            status: changes.status ?? booking.status,
        }, booking.id);
    }
};
exports.BookingApplicationService = BookingApplicationService;
exports.BookingApplicationService = BookingApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(application_repository_interface_1.BOOKING_REPOSITORY)),
    __param(1, (0, common_1.Inject)(application_repository_interface_1.EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], BookingApplicationService);
//# sourceMappingURL=booking-application.service.js.map