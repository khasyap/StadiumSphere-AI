"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const application_repository_interface_1 = require("../application/interfaces/application-repository.interface");
const booking_repository_1 = require("./repositories/booking.repository");
const event_repository_1 = require("./repositories/event.repository");
const organization_repository_1 = require("./repositories/organization.repository");
const sport_repository_1 = require("./repositories/sport.repository");
const stadium_repository_1 = require("./repositories/stadium.repository");
const team_repository_1 = require("./repositories/team.repository");
const user_repository_1 = require("./repositories/user.repository");
const venue_repository_1 = require("./repositories/venue.repository");
const booking_schema_1 = require("./schemas/booking.schema");
const event_schema_1 = require("./schemas/event.schema");
const organization_schema_1 = require("./schemas/organization.schema");
const sport_schema_1 = require("./schemas/sport.schema");
const stadium_schema_1 = require("./schemas/stadium.schema");
const team_schema_1 = require("./schemas/team.schema");
const user_schema_1 = require("./schemas/user.schema");
const venue_schema_1 = require("./schemas/venue.schema");
let RepositoryModule = class RepositoryModule {
};
exports.RepositoryModule = RepositoryModule;
exports.RepositoryModule = RepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.USER_PERSISTENCE_MODEL, schema: user_schema_1.UserPersistenceSchema },
                { name: stadium_schema_1.STADIUM_PERSISTENCE_MODEL, schema: stadium_schema_1.StadiumPersistenceSchema },
                { name: venue_schema_1.VENUE_PERSISTENCE_MODEL, schema: venue_schema_1.VenuePersistenceSchema },
                { name: team_schema_1.TEAM_PERSISTENCE_MODEL, schema: team_schema_1.TeamPersistenceSchema },
                { name: organization_schema_1.ORGANIZATION_PERSISTENCE_MODEL, schema: organization_schema_1.OrganizationPersistenceSchema },
                { name: booking_schema_1.BOOKING_PERSISTENCE_MODEL, schema: booking_schema_1.BookingPersistenceSchema },
                { name: sport_schema_1.SPORT_PERSISTENCE_MODEL, schema: sport_schema_1.SportPersistenceSchema },
                { name: event_schema_1.EVENT_PERSISTENCE_MODEL, schema: event_schema_1.EventPersistenceSchema },
            ]),
        ],
        providers: [
            user_repository_1.UserRepository,
            stadium_repository_1.StadiumRepository,
            venue_repository_1.VenueRepository,
            team_repository_1.TeamRepository,
            organization_repository_1.OrganizationRepository,
            booking_repository_1.BookingRepository,
            sport_repository_1.SportRepository,
            event_repository_1.EventRepository,
            { provide: application_repository_interface_1.USER_REPOSITORY, useExisting: user_repository_1.UserRepository },
            { provide: application_repository_interface_1.STADIUM_REPOSITORY, useExisting: stadium_repository_1.StadiumRepository },
            { provide: application_repository_interface_1.VENUE_REPOSITORY, useExisting: venue_repository_1.VenueRepository },
            { provide: application_repository_interface_1.TEAM_REPOSITORY, useExisting: team_repository_1.TeamRepository },
            { provide: application_repository_interface_1.ORGANIZATION_REPOSITORY, useExisting: organization_repository_1.OrganizationRepository },
            { provide: application_repository_interface_1.BOOKING_REPOSITORY, useExisting: booking_repository_1.BookingRepository },
            { provide: application_repository_interface_1.SPORT_REPOSITORY, useExisting: sport_repository_1.SportRepository },
            { provide: application_repository_interface_1.EVENT_REPOSITORY, useExisting: event_repository_1.EventRepository },
        ],
        exports: [
            application_repository_interface_1.USER_REPOSITORY,
            application_repository_interface_1.STADIUM_REPOSITORY,
            application_repository_interface_1.VENUE_REPOSITORY,
            application_repository_interface_1.TEAM_REPOSITORY,
            application_repository_interface_1.ORGANIZATION_REPOSITORY,
            application_repository_interface_1.BOOKING_REPOSITORY,
            application_repository_interface_1.SPORT_REPOSITORY,
            application_repository_interface_1.EVENT_REPOSITORY,
        ],
    })
], RepositoryModule);
//# sourceMappingURL=repository.module.js.map