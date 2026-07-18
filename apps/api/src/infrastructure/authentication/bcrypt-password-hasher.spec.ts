import { BcryptPasswordHasher } from './bcrypt-password-hasher';

describe('BcryptPasswordHasher', () => {
  const hasher = new BcryptPasswordHasher({ getOrThrow: jest.fn(() => 10) } as never);

  it('hashes passwords and verifies matching values securely', async () => {
    const hash = await hasher.hash('a-strong-password');

    await expect(hasher.verify('a-strong-password', hash)).resolves.toBe(true);
    await expect(hasher.verify('another-password', hash)).resolves.toBe(false);
  });
});
