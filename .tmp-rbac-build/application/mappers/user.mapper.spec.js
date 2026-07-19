"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const user_mapper_1 = require("./user.mapper");
describe('UserMapper', () => {
    const mapper = new user_mapper_1.UserMapper();
    it('maps a DTO into the existing domain entity', () => {
        const user = mapper.toDomain({ id: 'user-1', email: 'USER@example.com' });
        expect(user).toBeInstanceOf(domain_1.User);
        expect(user.id.toString()).toBe('user-1');
    });
    it('maps a domain entity into a DTO', () => {
        expect(mapper.toDto(mapper.toDomain({ id: 'user-1', email: 'USER@example.com' }))).toEqual({
            id: 'user-1',
            email: 'user@example.com',
        });
    });
});
//# sourceMappingURL=user.mapper.spec.js.map