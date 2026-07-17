import { randomUUID } from 'node:crypto';

import { Identifier } from './identifier';

export class UniqueEntityId extends Identifier<string> {
  public constructor(value: string = randomUUID()) {
    if (value.trim().length === 0) {
      throw new TypeError('A unique entity identifier cannot be empty.');
    }

    super(value);
  }
}
