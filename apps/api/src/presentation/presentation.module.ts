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
  ],
})
export class PresentationModule {}
