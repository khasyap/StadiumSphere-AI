import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { EntityTimestamps } from '../entity/entity';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { Capacity } from '../value-object/capacity';
import { StadiumStatus } from './stadium-status';

export interface StadiumProps {
  capacity: Capacity;
  name: string;
  status?: StadiumStatus;
}

export class Stadium extends AggregateRoot<StadiumProps> {
  public constructor(props: StadiumProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public get status(): StadiumStatus {
    return this.props.status ?? StadiumStatus.AVAILABLE;
  }

  public override toJSON(): Readonly<{
    capacity: Capacity;
    id: string;
    name: string;
    status: StadiumStatus;
  } & EntityTimestamps> {
    return Object.freeze({
      ...this.timestampsToJSON(),
      capacity: this.props.capacity,
      id: this.id.toString(),
      name: this.props.name,
      status: this.status,
    });
  }
}
