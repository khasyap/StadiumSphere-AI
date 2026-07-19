"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const user_persistence_mapper_1 = require("./user.persistence-mapper");
describe('UserPersistenceMapper', () => {
    const mapper = new user_persistence_mapper_1.UserPersistenceMapper();
    it('maps persistence fields into a domain entity', () => {
        const user = mapper.toDomain({ email: 'USER@example.com', id: 'user-1' });
        expect(user).toBeInstanceOf(domain_1.User);
        expect(user.toJSON()).toMatchObject({ id: 'user-1' });
        expect(user.role).toBe(domain_1.UserRole.USER);
    });
    it('maps a domain entity into persistence fields without DTO concerns', () => {
        const user = new domain_1.User({ email: new domain_1.Email('user@example.com') }, new domain_1.UniqueEntityId('user-1'));
        expect(mapper.toPersistence(user)).toEqual({ email: 'user@example.com', role: domain_1.UserRole.USER });
    });
});
//# sourceMappingURL=user.persistence-mapper.spec.js.map