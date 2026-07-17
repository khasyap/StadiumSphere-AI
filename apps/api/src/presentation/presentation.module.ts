import { Module } from '@nestjs/common';

import { ApplicationModule } from '../application';
import { BookingController } from './controllers/booking.controller';
import { OrganizationController } from './controllers/organization.controller';
import { StadiumController } from './controllers/stadium.controller';
import { TeamController } from './controllers/team.controller';
import { UserController } from './controllers/user.controller';
import { VenueController } from './controllers/venue.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [
    UserController,
    StadiumController,
    VenueController,
    TeamController,
    OrganizationController,
    BookingController,
  ],
})
export class PresentationModule {}
