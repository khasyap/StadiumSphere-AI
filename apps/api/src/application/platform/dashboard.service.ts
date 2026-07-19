import { Inject, Injectable } from '@nestjs/common';

import { BookingStatus, EventStatus, StadiumStatus, VenueStatus } from '../../domain';
import type {
  BookingRepositoryPort,
  EventRepositoryPort,
  OrganizationRepositoryPort,
  SportRepositoryPort,
  StadiumRepositoryPort,
  TeamRepositoryPort,
  UserRepositoryPort,
  VenueRepositoryPort,
} from '../interfaces/application-repository.interface';
import {
  BOOKING_REPOSITORY,
  EVENT_REPOSITORY,
  ORGANIZATION_REPOSITORY,
  SPORT_REPOSITORY,
  STADIUM_REPOSITORY,
  TEAM_REPOSITORY,
  USER_REPOSITORY,
  VENUE_REPOSITORY,
} from '../interfaces/application-repository.interface';

export interface PlatformDashboard {
  readonly bookings: Record<BookingStatus, number>;
  readonly events: Record<EventStatus, number>;
  readonly stadiumAvailability: number;
  readonly totals: {
    readonly bookings: number;
    readonly events: number;
    readonly organizations: number;
    readonly sports: number;
    readonly stadiums: number;
    readonly teams: number;
    readonly users: number;
    readonly venues: number;
  };
  readonly upcomingEvents: number;
  readonly venueUtilization: number;
  readonly venues: Record<VenueStatus, number>;
  readonly stadiums: Record<StadiumStatus, number>;
}

@Injectable()
export class DashboardService {
  public constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepositoryPort,
    @Inject(ORGANIZATION_REPOSITORY) private readonly organizationRepository: OrganizationRepositoryPort,
    @Inject(STADIUM_REPOSITORY) private readonly stadiumRepository: StadiumRepositoryPort,
    @Inject(VENUE_REPOSITORY) private readonly venueRepository: VenueRepositoryPort,
    @Inject(TEAM_REPOSITORY) private readonly teamRepository: TeamRepositoryPort,
    @Inject(SPORT_REPOSITORY) private readonly sportRepository: SportRepositoryPort,
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: EventRepositoryPort,
    @Inject(BOOKING_REPOSITORY) private readonly bookingRepository: BookingRepositoryPort,
  ) {}

  public async getDashboard(): Promise<PlatformDashboard> {
    const [users, organizations, stadiums, venues, teams, sports, events, bookings] = await Promise.all([
      this.userRepository.findAll(),
      this.organizationRepository.findAll(),
      this.stadiumRepository.findAll(),
      this.venueRepository.findAll(),
      this.teamRepository.findAll(),
      this.sportRepository.findAll(),
      this.eventRepository.findAll(),
      this.bookingRepository.findAll(),
    ]);
    const eventCounts = this.countEvents(events);
    const bookingCounts = this.countBookings(bookings);
    const venueCounts = this.countVenues(venues);
    const stadiumCounts = this.countStadiums(stadiums);

    return {
      bookings: bookingCounts,
      events: eventCounts,
      stadiumAvailability: this.percentage(stadiumCounts[StadiumStatus.AVAILABLE], stadiums.length),
      stadiums: stadiumCounts,
      totals: {
        bookings: bookings.length,
        events: events.length,
        organizations: organizations.length,
        sports: sports.length,
        stadiums: stadiums.length,
        teams: teams.length,
        users: users.length,
        venues: venues.length,
      },
      upcomingEvents: events.filter(
        (event) => event.status === EventStatus.SCHEDULED && event.toJSON().timeSlot.startsAt > new Date(),
      ).length,
      venueUtilization: this.percentage(venueCounts[VenueStatus.RESERVED], venues.length),
      venues: venueCounts,
    };
  }

  private countBookings(bookings: readonly { status: BookingStatus }[]): Record<BookingStatus, number> {
    return this.countByStatus(bookings, Object.values(BookingStatus));
  }

  private countEvents(events: readonly { status: EventStatus }[]): Record<EventStatus, number> {
    return this.countByStatus(events, Object.values(EventStatus));
  }

  private countStadiums(stadiums: readonly { status: StadiumStatus }[]): Record<StadiumStatus, number> {
    return this.countByStatus(stadiums, Object.values(StadiumStatus));
  }

  private countVenues(venues: readonly { status: VenueStatus }[]): Record<VenueStatus, number> {
    return this.countByStatus(venues, Object.values(VenueStatus));
  }

  private countByStatus<TStatus extends string>(
    values: readonly { status: TStatus }[],
    statuses: readonly TStatus[],
  ): Record<TStatus, number> {
    return statuses.reduce<Record<TStatus, number>>((result, status) => {
      result[status] = values.filter((value) => value.status === status).length;
      return result;
    }, {} as Record<TStatus, number>);
  }

  private percentage(value: number, total: number): number {
    return total === 0 ? 0 : Math.round((value / total) * 100);
  }
}
