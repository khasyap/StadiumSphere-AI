import { UniqueEntityId } from '../identifier/unique-entity-id';

export interface EntityTimestamps {
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Entity<TProps extends object> {
  public readonly id: UniqueEntityId;
  private timestamps?: Readonly<EntityTimestamps>;

  protected constructor(
    protected readonly props: Readonly<TProps>,
    id?: UniqueEntityId,
  ) {
    this.id = id ?? new UniqueEntityId();
  }

  public equals(entity?: Entity<TProps>): boolean {
    return entity !== undefined && this.id.equals(entity.id);
  }

  public hydrateTimestamps(timestamps: EntityTimestamps): void {
    const { createdAt, updatedAt } = timestamps;
    const hydratedTimestamps: EntityTimestamps = {};

    if (createdAt !== undefined) {
      hydratedTimestamps.createdAt = createdAt;
    }

    if (updatedAt !== undefined) {
      hydratedTimestamps.updatedAt = updatedAt;
    }

    if (Object.keys(hydratedTimestamps).length > 0) {
      this.timestamps = Object.freeze(hydratedTimestamps);
    }
  }

  public toJSON(): Readonly<TProps & EntityTimestamps & { id: string }> {
    return Object.freeze({ ...this.props, ...this.timestampsToJSON(), id: this.id.toString() });
  }

  protected timestampsToJSON(): Readonly<EntityTimestamps> {
    return this.timestamps ?? {};
  }
}
