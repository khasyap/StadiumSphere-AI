import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { Capacity } from '../value-object/capacity';
export interface StadiumProps {
    name: string;
    capacity: Capacity;
}
export declare class Stadium extends AggregateRoot<StadiumProps> {
    constructor(props: StadiumProps, id?: UniqueEntityId);
}
