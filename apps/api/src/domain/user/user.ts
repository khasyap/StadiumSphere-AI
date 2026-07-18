import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { Email } from '../value-object/email';

export interface UserProps {
  email: Email;
  passwordHash?: string;
  refreshTokenHash?: string;
}

export class User extends AggregateRoot<UserProps> {
  public constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public get passwordHash(): string | undefined {
    return this.props.passwordHash;
  }

  public get refreshTokenHash(): string | undefined {
    return this.props.refreshTokenHash;
  }

  public override toJSON(): Readonly<{ email: Email; id: string }> {
    return Object.freeze({ email: this.props.email, id: this.id.toString() });
  }
}
