"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const domain_1 = require("../../domain");
class UserMapper {
    toDomain(dto) {
        return new domain_1.User({ email: new domain_1.Email(dto.email) }, new domain_1.UniqueEntityId(dto.id));
    }
    toDto(domain) {
        const user = domain.toJSON();
        return {
            id: user.id,
            email: user.email.value,
        };
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map