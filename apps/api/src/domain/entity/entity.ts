import { UniqueEntityId } from '../identifier/unique-entity-id';

export abstract class Entity<TProps extends object> {
  public readonly id: UniqueEntityId;

  protected constructor(
    protected readonly props: Readonly<TProps>,
    id?: UniqueEntityId,
  ) {
    this.id = id ?? new UniqueEntityId();
  }

  public equals(entity?: Entity<TProps>): boolean {
    return entity !== undefined && this.id.equals(entity.id);
  }

  public toJSON(): Readonly<TProps & { id: string }> {
    return Object.freeze({ ...this.props, id: this.id.toString() });
  }
}
