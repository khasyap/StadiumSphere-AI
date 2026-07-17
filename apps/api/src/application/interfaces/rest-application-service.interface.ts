export interface RestApplicationService<TCreate, TUpdate, TResponse> {
  create(command: TCreate): Promise<TResponse>;
  delete(id: string): Promise<void>;
  findAll(): Promise<readonly TResponse[]>;
  findById(id: string): Promise<TResponse>;
  update(id: string, command: TUpdate): Promise<TResponse>;
}

export const USER_APPLICATION_SERVICE = Symbol('Application.UserService');
export const STADIUM_APPLICATION_SERVICE = Symbol('Application.StadiumService');
export const VENUE_APPLICATION_SERVICE = Symbol('Application.VenueService');
export const TEAM_APPLICATION_SERVICE = Symbol('Application.TeamService');
export const ORGANIZATION_APPLICATION_SERVICE = Symbol('Application.OrganizationService');
export const BOOKING_APPLICATION_SERVICE = Symbol('Application.BookingService');
