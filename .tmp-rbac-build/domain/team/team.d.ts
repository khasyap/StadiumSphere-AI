import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { Sport } from '../sport/sport';
export interface TeamProps {
    name: string;
    sport: Sport;
}
export declare class Team extends AggregateRoot<TeamProps> {
    constructor(props: TeamProps, id?: UniqueEntityId);
}
