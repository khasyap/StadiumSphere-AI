"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentationModule = void 0;
const common_1 = require("@nestjs/common");
const application_1 = require("../application");
const booking_controller_1 = require("./controllers/booking.controller");
const authentication_controller_1 = require("./controllers/authentication.controller");
const event_controller_1 = require("./controllers/event.controller");
const organization_controller_1 = require("./controllers/organization.controller");
const stadium_controller_1 = require("./controllers/stadium.controller");
const sport_controller_1 = require("./controllers/sport.controller");
const team_controller_1 = require("./controllers/team.controller");
const user_controller_1 = require("./controllers/user.controller");
const venue_controller_1 = require("./controllers/venue.controller");
const jwt_authentication_guard_1 = require("./guards/jwt-authentication.guard");
const roles_guard_1 = require("./guards/roles.guard");
let PresentationModule = class PresentationModule {
};
exports.PresentationModule = PresentationModule;
exports.PresentationModule = PresentationModule = __decorate([
    (0, common_1.Module)({
        imports: [application_1.ApplicationModule],
        controllers: [
            authentication_controller_1.AuthenticationController,
            user_controller_1.UserController,
            stadium_controller_1.StadiumController,
            venue_controller_1.VenueController,
            team_controller_1.TeamController,
            organization_controller_1.OrganizationController,
            booking_controller_1.BookingController,
            sport_controller_1.SportController,
            event_controller_1.EventController,
        ],
        providers: [jwt_authentication_guard_1.JwtAuthenticationGuard, roles_guard_1.RolesGuard],
    })
], PresentationModule);
//# sourceMappingURL=presentation.module.js.map