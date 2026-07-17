import { MODULE_METADATA } from '@nestjs/common/constants';

import { USER_REPOSITORY } from '../application';
import { UserRepository } from './repositories/user.repository';
import { RepositoryModule } from './repository.module';

describe('RepositoryModule', () => {
  it('registers repository adapters against application port tokens', () => {
    const providers = Reflect.getMetadata(MODULE_METADATA.PROVIDERS, RepositoryModule) as unknown[];

    expect(providers).toEqual(
      expect.arrayContaining([
        UserRepository,
        expect.objectContaining({ provide: USER_REPOSITORY, useExisting: UserRepository }),
      ]),
    );
  });
});
