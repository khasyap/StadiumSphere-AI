import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { Email } from '../value-object/email';
import { UserRole } from './user-role';
export interface UserProps {
    email: Email;
    passwordHash?: string;
    refreshTokenHash?: string;
    role?: UserRole;
}
export declare class User extends AggregateRoot<UserProps> {
    constructor(props: UserProps, id?: UniqueEntityId);
    get passwordHash(): string | undefined;
    get refreshTokenHash(): string | undefined;
    get role(): UserRole;
    toJSON(): Readonly<{
        email: Email;
        id: string;
    }>;
}
