"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPersistenceMapper = void 0;
const domain_1 = require("../../domain");
class UserPersistenceMapper {
    toDomain(document) {
        const properties = { email: new domain_1.Email(document.email) };
        properties.role = document.role ?? domain_1.UserRole.USER;
        if (document.passwordHash !== undefined) {
            properties.passwordHash = document.passwordHash;
        }
        if (document.refreshTokenHash !== undefined) {
            properties.refreshTokenHash = document.refreshTokenHash;
        }
        return new domain_1.User(properties, new domain_1.UniqueEntityId(document.id));
    }
    toPersistence(entity) {
        const persistence = {
            email: entity.toJSON().email.value,
            role: entity.role,
        };
        if (entity.passwordHash !== undefined) {
            persistence.passwordHash = entity.passwordHash;
        }
        if (entity.refreshTokenHash !== undefined) {
            persistence.refreshTokenHash = entity.refreshTokenHash;
        }
        return persistence;
    }
}
exports.UserPersistenceMapper = UserPersistenceMapper;
//# sourceMappingURL=user.persistence-mapper.js.map