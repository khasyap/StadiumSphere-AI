import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';

export interface OrganizationProps {
  name: string;
}

export class Organization extends AggregateRoot<OrganizationProps> {
  public constructor(props: OrganizationProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
