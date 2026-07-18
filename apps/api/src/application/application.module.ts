import { Module } from '@nestjs/common';

import {
  BOOKING_APPLICATION_SERVICE,
  EVENT_APPLICATION_SERVICE,
  ORGANIZATION_APPLICATION_SERVICE,
  STADIUM_APPLICATION_SERVICE,
  SPORT_APPLICATION_SERVICE,
  TEAM_APPLICATION_SERVICE,
  USER_APPLICATION_SERVICE,
  VENUE_APPLICATION_SERVICE,
} from './interfaces/rest-application-service.interface';
import { BookingApplicationService } from './services/booking-application.service';
import { EventApplicationService } from './services/event-application.service';
import { OrganizationApplicationService } from './services/organization-application.service';
import { StadiumApplicationService } from './services/stadium-application.service';
import { SportApplicationService } from './services/sport-application.service';
import { TeamApplicationService } from './services/team-application.service';
import { UserApplicationService } from './services/user-application.service';
import { VenueApplicationService } from './services/venue-application.service';
import { RepositoryModule } from '../infrastructure/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [
    UserApplicationService,
    StadiumApplicationService,
    VenueApplicationService,
    TeamApplicationService,
    OrganizationApplicationService,
    BookingApplicationService,
    SportApplicationService,
    EventApplicationService,
    { provide: USER_APPLICATION_SERVICE, useExisting: UserApplicationService },
    { provide: STADIUM_APPLICATION_SERVICE, useExisting: StadiumApplicationService },
    { provide: VENUE_APPLICATION_SERVICE, useExisting: VenueApplicationService },
    { provide: TEAM_APPLICATION_SERVICE, useExisting: TeamApplicationService },
    { provide: ORGANIZATION_APPLICATION_SERVICE, useExisting: OrganizationApplicationService },
    { provide: BOOKING_APPLICATION_SERVICE, useExisting: BookingApplicationService },
    { provide: SPORT_APPLICATION_SERVICE, useExisting: SportApplicationService },
    { provide: EVENT_APPLICATION_SERVICE, useExisting: EventApplicationService },
  ],
  exports: [
    USER_APPLICATION_SERVICE,
    STADIUM_APPLICATION_SERVICE,
    VENUE_APPLICATION_SERVICE,
    TEAM_APPLICATION_SERVICE,
    ORGANIZATION_APPLICATION_SERVICE,
    BOOKING_APPLICATION_SERVICE,
    SPORT_APPLICATION_SERVICE,
    EVENT_APPLICATION_SERVICE,
  ],
})
export class ApplicationModule {}
