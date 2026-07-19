import { Venue } from '../../domain';
import type { VenueRepositoryPort } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';
interface VenueAddressCommand {
    addressLine1?: string;
    city?: string;
    country?: string;
    postalCode?: string;
}
export interface VenueCreateCommand extends VenueAddressCommand {
    latitude: number;
    longitude: number;
    name: string;
}
export interface VenueUpdateCommand {
    latitude?: number;
    longitude?: number;
    name?: string;
}
export declare class VenueApplicationService extends CrudApplicationService<Venue, VenueCreateCommand, VenueUpdateCommand> {
    constructor(repository: VenueRepositoryPort);
    protected createEntity(command: VenueCreateCommand): Venue;
    protected updateEntity(current: Venue, command: VenueUpdateCommand): Venue;
    private createLocation;
    private createAddress;
}
export {};
