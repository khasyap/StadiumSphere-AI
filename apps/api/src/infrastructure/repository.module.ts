import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  BOOKING_REPOSITORY,
  EVENT_REPOSITORY,
  ORGANIZATION_REPOSITORY,
  SPORT_REPOSITORY,
  STADIUM_REPOSITORY,
  TEAM_REPOSITORY,
  USER_REPOSITORY,
  VENUE_REPOSITORY,
} from '../application';
import { BookingRepository } from './repositories/booking.repository';
import { EventRepository } from './repositories/event.repository';
import { OrganizationRepository } from './repositories/organization.repository';
import { SportRepository } from './repositories/sport.repository';
import { StadiumRepository } from './repositories/stadium.repository';
import { TeamRepository } from './repositories/team.repository';
import { UserRepository } from './repositories/user.repository';
import { VenueRepository } from './repositories/venue.repository';
import { BOOKING_PERSISTENCE_MODEL, BookingPersistenceSchema } from './schemas/booking.schema';
import { EVENT_PERSISTENCE_MODEL, EventPersistenceSchema } from './schemas/event.schema';
import {
  ORGANIZATION_PERSISTENCE_MODEL,
  OrganizationPersistenceSchema,
} from './schemas/organization.schema';
import { SPORT_PERSISTENCE_MODEL, SportPersistenceSchema } from './schemas/sport.schema';
import { STADIUM_PERSISTENCE_MODEL, StadiumPersistenceSchema } from './schemas/stadium.schema';
import { TEAM_PERSISTENCE_MODEL, TeamPersistenceSchema } from './schemas/team.schema';
import { USER_PERSISTENCE_MODEL, UserPersistenceSchema } from './schemas/user.schema';
import { VENUE_PERSISTENCE_MODEL, VenuePersistenceSchema } from './schemas/venue.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER_PERSISTENCE_MODEL, schema: UserPersistenceSchema },
      { name: STADIUM_PERSISTENCE_MODEL, schema: StadiumPersistenceSchema },
      { name: VENUE_PERSISTENCE_MODEL, schema: VenuePersistenceSchema },
      { name: TEAM_PERSISTENCE_MODEL, schema: TeamPersistenceSchema },
      { name: ORGANIZATION_PERSISTENCE_MODEL, schema: OrganizationPersistenceSchema },
      { name: BOOKING_PERSISTENCE_MODEL, schema: BookingPersistenceSchema },
      { name: SPORT_PERSISTENCE_MODEL, schema: SportPersistenceSchema },
      { name: EVENT_PERSISTENCE_MODEL, schema: EventPersistenceSchema },
    ]),
  ],
  providers: [
    UserRepository,
    StadiumRepository,
    VenueRepository,
    TeamRepository,
    OrganizationRepository,
    BookingRepository,
    SportRepository,
    EventRepository,
    { provide: USER_REPOSITORY, useExisting: UserRepository },
    { provide: STADIUM_REPOSITORY, useExisting: StadiumRepository },
    { provide: VENUE_REPOSITORY, useExisting: VenueRepository },
    { provide: TEAM_REPOSITORY, useExisting: TeamRepository },
    { provide: ORGANIZATION_REPOSITORY, useExisting: OrganizationRepository },
    { provide: BOOKING_REPOSITORY, useExisting: BookingRepository },
    { provide: SPORT_REPOSITORY, useExisting: SportRepository },
    { provide: EVENT_REPOSITORY, useExisting: EventRepository },
  ],
  exports: [
    USER_REPOSITORY,
    STADIUM_REPOSITORY,
    VENUE_REPOSITORY,
    TEAM_REPOSITORY,
    ORGANIZATION_REPOSITORY,
    BOOKING_REPOSITORY,
    SPORT_REPOSITORY,
    EVENT_REPOSITORY,
  ],
})
export class RepositoryModule {}
