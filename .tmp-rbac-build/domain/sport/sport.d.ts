import { Entity } from '../entity/entity';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
export interface SportProps {
    name: string;
}
export declare class Sport extends Entity<SportProps> {
    constructor(props: SportProps, id?: UniqueEntityId);
}
