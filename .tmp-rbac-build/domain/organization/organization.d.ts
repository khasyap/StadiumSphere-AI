import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
export interface OrganizationProps {
    name: string;
}
export declare class Organization extends AggregateRoot<OrganizationProps> {
    constructor(props: OrganizationProps, id?: UniqueEntityId);
}
