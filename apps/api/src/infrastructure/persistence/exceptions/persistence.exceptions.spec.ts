import { HttpStatus } from '@nestjs/common';

import { DuplicateEntityException } from './duplicate-entity.exception';
import { EntityNotFoundException } from './entity-not-found.exception';
import { PersistenceException } from './persistence.exception';

describe('persistence exceptions', () => {
  it('uses HTTP-compatible status codes for persistence failures', () => {
    expect(new EntityNotFoundException('Entity', 'id').getStatus()).toBe(HttpStatus.NOT_FOUND);
    expect(new DuplicateEntityException('Entity').getStatus()).toBe(HttpStatus.CONFLICT);
    expect(new PersistenceException().getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
