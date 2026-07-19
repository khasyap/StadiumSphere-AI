export interface RestApplicationService<TCreate, TUpdate, TResponse> {
    create(command: TCreate): Promise<TResponse>;
    delete(id: string): Promise<void>;
    findAll(): Promise<readonly TResponse[]>;
    findById(id: string): Promise<TResponse>;
    update(id: string, command: TUpdate): Promise<TResponse>;
}
export declare const USER_APPLICATION_SERVICE: unique symbol;
export declare const STADIUM_APPLICATION_SERVICE: unique symbol;
export declare const VENUE_APPLICATION_SERVICE: unique symbol;
export declare const TEAM_APPLICATION_SERVICE: unique symbol;
export declare const ORGANIZATION_APPLICATION_SERVICE: unique symbol;
export declare const BOOKING_APPLICATION_SERVICE: unique symbol;
export declare const SPORT_APPLICATION_SERVICE: unique symbol;
export declare const EVENT_APPLICATION_SERVICE: unique symbol;
export declare const AUTHENTICATION_APPLICATION_SERVICE: unique symbol;
