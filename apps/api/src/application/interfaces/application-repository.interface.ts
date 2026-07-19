import type {
  Booking,
  Email,
  Event,
  TimeSlot,
  Organization,
  Sport,
  Stadium,
  Team,
  UniqueEntityId,
  User,
  Venue,
} from '../../domain';

export interface ApplicationRepository<TEntity> {
  create(entity: TEntity): Promise<TEntity>;
  delete(id: UniqueEntityId): Promise<void>;
  findAll(): Promise<readonly TEntity[]>;
  findById(id: UniqueEntityId): Promise<TEntity | null>;
  update(id: UniqueEntityId, entity: TEntity): Promise<TEntity>;
}

export interface UserRepositoryPort extends ApplicationRepository<User> {
  findByEmail(email: Email): Promise<User | null>;
}
export type StadiumRepositoryPort = ApplicationRepository<Stadium>;
export type VenueRepositoryPort = ApplicationRepository<Venue>;
export interface TeamRepositoryPort extends ApplicationRepository<Team> {
  existsBySportId(sportId: UniqueEntityId): Promise<boolean>;
}
export type OrganizationRepositoryPort = ApplicationRepository<Organization>;
export type BookingRepositoryPort = ApplicationRepository<Booking>;
export type SportRepositoryPort = ApplicationRepository<Sport>;
export interface EventRepositoryPort extends ApplicationRepository<Event> {
  existsByTimeSlot(timeSlot: TimeSlot): Promise<boolean>;
}

export const USER_REPOSITORY = Symbol('Application.UserRepository');
export const STADIUM_REPOSITORY = Symbol('Application.StadiumRepository');
export const VENUE_REPOSITORY = Symbol('Application.VenueRepository');
export const TEAM_REPOSITORY = Symbol('Application.TeamRepository');
export const ORGANIZATION_REPOSITORY = Symbol('Application.OrganizationRepository');
export const BOOKING_REPOSITORY = Symbol('Application.BookingRepository');
export const SPORT_REPOSITORY = Symbol('Application.SportRepository');
export const EVENT_REPOSITORY = Symbol('Application.EventRepository');
