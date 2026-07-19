import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { EntityTimestamps } from '../entity/entity';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { Email } from '../value-object/email';
import { UserRole } from './user-role';

export interface UserProps {
  email: Email;
  passwordHash?: string;
  refreshTokenHash?: string;
  role?: UserRole;
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

  public get role(): UserRole {
    return this.props.role ?? UserRole.USER;
  }

  public override toJSON(): Readonly<{ email: Email; id: string; role: UserRole } & EntityTimestamps> {
    return Object.freeze({
      ...this.timestampsToJSON(),
      email: this.props.email,
      id: this.id.toString(),
      role: this.role,
    });
  }
}
