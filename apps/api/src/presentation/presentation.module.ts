import { Module } from '@nestjs/common';

import { ApplicationModule } from '../application';
import { BookingController } from './controllers/booking.controller';
import { AuthenticationController } from './controllers/authentication.controller';
import { EventController } from './controllers/event.controller';
import { OrganizationController } from './controllers/organization.controller';
import { StadiumController } from './controllers/stadium.controller';
import { SportController } from './controllers/sport.controller';
import { TeamController } from './controllers/team.controller';
import { UserController } from './controllers/user.controller';
import { VenueController } from './controllers/venue.controller';
import { ActivityController } from './controllers/activity.controller';
import { AssistantController } from './controllers/assistant.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [ApplicationModule],
  controllers: [
    AuthenticationController,
    UserController,
    StadiumController,
    VenueController,
    TeamController,
    OrganizationController,
    BookingController,
    SportController,
    EventController,
    ActivityController,
    DashboardController,
    AssistantController,
  ],
  providers: [JwtAuthenticationGuard, RolesGuard],
})
export class PresentationModule {}
