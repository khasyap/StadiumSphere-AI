import { UniqueEntityId } from '../identifier/unique-entity-id';
export declare abstract class Entity<TProps extends object> {
    protected readonly props: Readonly<TProps>;
    readonly id: UniqueEntityId;
    protected constructor(props: Readonly<TProps>, id?: UniqueEntityId);
    equals(entity?: Entity<TProps>): boolean;
    toJSON(): Readonly<TProps & {
        id: string;
    }>;
}
