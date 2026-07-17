import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { Email } from '../value-object/email';

export interface UserProps {
  email: Email;
}

export class User extends AggregateRoot<UserProps> {
  public constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
