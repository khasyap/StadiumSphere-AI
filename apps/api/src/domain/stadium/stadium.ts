import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { Capacity } from '../value-object/capacity';

export interface StadiumProps {
  name: string;
  capacity: Capacity;
}

export class Stadium extends AggregateRoot<StadiumProps> {
  public constructor(props: StadiumProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
