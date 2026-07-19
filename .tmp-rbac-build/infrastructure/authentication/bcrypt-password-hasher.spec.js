"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_password_hasher_1 = require("./bcrypt-password-hasher");
describe('BcryptPasswordHasher', () => {
    const hasher = new bcrypt_password_hasher_1.BcryptPasswordHasher({ getOrThrow: jest.fn(() => 10) });
    it('hashes passwords and verifies matching values securely', async () => {
        const hash = await hasher.hash('a-strong-password');
        await expect(hasher.verify('a-strong-password', hash)).resolves.toBe(true);
        await expect(hasher.verify('another-password', hash)).resolves.toBe(false);
    });
});
//# sourceMappingURL=bcrypt-password-hasher.spec.js.map