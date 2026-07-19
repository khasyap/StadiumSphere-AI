import type { Booking, Email, Event, TimeSlot, Organization, Sport, Stadium, Team, UniqueEntityId, User, Venue } from '../../domain';
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
export declare const USER_REPOSITORY: unique symbol;
export declare const STADIUM_REPOSITORY: unique symbol;
export declare const VENUE_REPOSITORY: unique symbol;
export declare const TEAM_REPOSITORY: unique symbol;
export declare const ORGANIZATION_REPOSITORY: unique symbol;
export declare const BOOKING_REPOSITORY: unique symbol;
export declare const SPORT_REPOSITORY: unique symbol;
export declare const EVENT_REPOSITORY: unique symbol;
