"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const stadium_dto_1 = require("./stadium.dto");
const organization_dto_1 = require("./organization.dto");
const user_dto_1 = require("./user.dto");
const venue_dto_1 = require("./venue.dto");
const booking_dto_1 = require("./booking.dto");
const event_dto_1 = require("./event.dto");
const sport_dto_1 = require("./sport.dto");
const team_dto_1 = require("./team.dto");
const authentication_dto_1 = require("./authentication.dto");
describe('presentation DTO validation', () => {
    it('rejects invalid transport email input', async () => {
        const dto = Object.assign(new user_dto_1.CreateUserDto(), { email: 'invalid-email' });
        await expect((0, class_validator_1.validate)(dto)).resolves.toHaveLength(1);
    });
    it('rejects a blank organization name', async () => {
        const dto = Object.assign(new organization_dto_1.CreateOrganizationDto(), { name: '' });
        await expect((0, class_validator_1.validate)(dto)).resolves.toHaveLength(1);
    });
    it('accepts a valid stadium transport payload', async () => {
        const dto = Object.assign(new stadium_dto_1.CreateStadiumDto(), { capacity: 50000, name: 'Arena' });
        await expect((0, class_validator_1.validate)(dto)).resolves.toHaveLength(0);
    });
    it('rejects a blank stadium name', async () => {
        const dto = Object.assign(new stadium_dto_1.CreateStadiumDto(), { capacity: 50000, name: '' });
        await expect((0, class_validator_1.validate)(dto)).resolves.toHaveLength(1);
    });
    it('rejects out-of-range venue coordinates before application handling', async () => {
        const dto = Object.assign(new venue_dto_1.CreateVenueDto(), {
            latitude: 91,
            longitude: 80,
            name: 'Arena',
        });
        await expect((0, class_validator_1.validate)(dto)).resolves.toHaveLength(1);
    });
    it('rejects blank venue text fields', async () => {
        const dto = Object.assign(new venue_dto_1.CreateVenueDto(), {
            addressLine1: '',
            latitude: 13.0827,
            longitude: 80.2707,
            name: '',
        });
        await expect((0, class_validator_1.validate)(dto)).resolves.toHaveLength(2);
    });
    it('rejects blank Team, Sport, and Booking text fields', async () => {
        const team = Object.assign(new team_dto_1.CreateTeamDto(), { name: '', sportId: '', sportName: '' });
        const sport = Object.assign(new sport_dto_1.CreateSportDto(), { name: '' });
        const booking = Object.assign(new booking_dto_1.CreateBookingDto(), { eventId: '', reference: '' });
        await expect((0, class_validator_1.validate)(team)).resolves.toHaveLength(3);
        await expect((0, class_validator_1.validate)(sport)).resolves.toHaveLength(1);
        await expect((0, class_validator_1.validate)(booking)).resolves.toHaveLength(2);
    });
    it('rejects invalid event date input before application handling', async () => {
        const dto = Object.assign(new event_dto_1.CreateEventDto(), {
            endsAt: new Date('invalid'),
            name: 'Championship Final',
            startsAt: new Date('2026-07-18T18:00:00.000Z'),
        });
        await expect((0, class_validator_1.validate)(dto)).resolves.toHaveLength(1);
    });
    it('validates authentication credentials and refresh tokens', async () => {
        const invalidLogin = Object.assign(new authentication_dto_1.LoginDto(), { email: 'invalid', password: 'short' });
        const validLogin = Object.assign(new authentication_dto_1.LoginDto(), {
            email: 'fan@example.com',
            password: 'a-strong-password',
        });
        const invalidRefresh = Object.assign(new authentication_dto_1.RefreshTokenDto(), { refreshToken: '' });
        await expect((0, class_validator_1.validate)(invalidLogin)).resolves.toHaveLength(2);
        await expect((0, class_validator_1.validate)(validLogin)).resolves.toHaveLength(0);
        await expect((0, class_validator_1.validate)(invalidRefresh)).resolves.toHaveLength(1);
    });
});
//# sourceMappingURL=dto.validation.spec.js.map