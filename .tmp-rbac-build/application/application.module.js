"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const rest_application_service_interface_1 = require("./interfaces/rest-application-service.interface");
const authentication_application_service_1 = require("./services/authentication-application.service");
const booking_application_service_1 = require("./services/booking-application.service");
const event_application_service_1 = require("./services/event-application.service");
const organization_application_service_1 = require("./services/organization-application.service");
const stadium_application_service_1 = require("./services/stadium-application.service");
const sport_application_service_1 = require("./services/sport-application.service");
const team_application_service_1 = require("./services/team-application.service");
const user_application_service_1 = require("./services/user-application.service");
const venue_application_service_1 = require("./services/venue-application.service");
const repository_module_1 = require("../infrastructure/repository.module");
const authentication_infrastructure_module_1 = require("../infrastructure/authentication/authentication-infrastructure.module");
let ApplicationModule = class ApplicationModule {
};
exports.ApplicationModule = ApplicationModule;
exports.ApplicationModule = ApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [repository_module_1.RepositoryModule, authentication_infrastructure_module_1.AuthenticationInfrastructureModule],
        providers: [
            user_application_service_1.UserApplicationService,
            stadium_application_service_1.StadiumApplicationService,
            venue_application_service_1.VenueApplicationService,
            team_application_service_1.TeamApplicationService,
            organization_application_service_1.OrganizationApplicationService,
            booking_application_service_1.BookingApplicationService,
            sport_application_service_1.SportApplicationService,
            event_application_service_1.EventApplicationService,
            authentication_application_service_1.AuthenticationApplicationService,
            { provide: rest_application_service_interface_1.USER_APPLICATION_SERVICE, useExisting: user_application_service_1.UserApplicationService },
            { provide: rest_application_service_interface_1.STADIUM_APPLICATION_SERVICE, useExisting: stadium_application_service_1.StadiumApplicationService },
            { provide: rest_application_service_interface_1.VENUE_APPLICATION_SERVICE, useExisting: venue_application_service_1.VenueApplicationService },
            { provide: rest_application_service_interface_1.TEAM_APPLICATION_SERVICE, useExisting: team_application_service_1.TeamApplicationService },
            { provide: rest_application_service_interface_1.ORGANIZATION_APPLICATION_SERVICE, useExisting: organization_application_service_1.OrganizationApplicationService },
            { provide: rest_application_service_interface_1.BOOKING_APPLICATION_SERVICE, useExisting: booking_application_service_1.BookingApplicationService },
            { provide: rest_application_service_interface_1.SPORT_APPLICATION_SERVICE, useExisting: sport_application_service_1.SportApplicationService },
            { provide: rest_application_service_interface_1.EVENT_APPLICATION_SERVICE, useExisting: event_application_service_1.EventApplicationService },
            { provide: rest_application_service_interface_1.AUTHENTICATION_APPLICATION_SERVICE, useExisting: authentication_application_service_1.AuthenticationApplicationService },
        ],
        exports: [
            rest_application_service_interface_1.USER_APPLICATION_SERVICE,
            rest_application_service_interface_1.STADIUM_APPLICATION_SERVICE,
            rest_application_service_interface_1.VENUE_APPLICATION_SERVICE,
            rest_application_service_interface_1.TEAM_APPLICATION_SERVICE,
            rest_application_service_interface_1.ORGANIZATION_APPLICATION_SERVICE,
            rest_application_service_interface_1.BOOKING_APPLICATION_SERVICE,
            rest_application_service_interface_1.SPORT_APPLICATION_SERVICE,
            rest_application_service_interface_1.EVENT_APPLICATION_SERVICE,
            rest_application_service_interface_1.AUTHENTICATION_APPLICATION_SERVICE,
        ],
    })
], ApplicationModule);
//# sourceMappingURL=application.module.js.map