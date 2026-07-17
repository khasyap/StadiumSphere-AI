import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { Sport } from '../sport/sport';

export interface TeamProps {
  name: string;
  sport: Sport;
}

export class Team extends AggregateRoot<TeamProps> {
  public constructor(props: TeamProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
