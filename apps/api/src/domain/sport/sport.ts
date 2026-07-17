import { Entity } from '../entity/entity';
import type { UniqueEntityId } from '../identifier/unique-entity-id';

export interface SportProps {
  name: string;
}

export class Sport extends Entity<SportProps> {
  public constructor(props: SportProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
