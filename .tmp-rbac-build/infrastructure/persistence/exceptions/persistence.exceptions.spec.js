"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const duplicate_entity_exception_1 = require("./duplicate-entity.exception");
const entity_not_found_exception_1 = require("./entity-not-found.exception");
const persistence_exception_1 = require("./persistence.exception");
describe('persistence exceptions', () => {
    it('uses HTTP-compatible status codes for persistence failures', () => {
        expect(new entity_not_found_exception_1.EntityNotFoundException('Entity', 'id').getStatus()).toBe(common_1.HttpStatus.NOT_FOUND);
        expect(new duplicate_entity_exception_1.DuplicateEntityException('Entity').getStatus()).toBe(common_1.HttpStatus.CONFLICT);
        expect(new persistence_exception_1.PersistenceException().getStatus()).toBe(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    });
});
//# sourceMappingURL=persistence.exceptions.spec.js.map