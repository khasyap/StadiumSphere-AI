"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@nestjs/common/constants");
const application_1 = require("../application");
const user_repository_1 = require("./repositories/user.repository");
const repository_module_1 = require("./repository.module");
describe('RepositoryModule', () => {
    it('registers repository adapters against application port tokens', () => {
        const providers = Reflect.getMetadata(constants_1.MODULE_METADATA.PROVIDERS, repository_module_1.RepositoryModule);
        expect(providers).toEqual(expect.arrayContaining([
            user_repository_1.UserRepository,
            expect.objectContaining({ provide: application_1.USER_REPOSITORY, useExisting: user_repository_1.UserRepository }),
        ]));
    });
});
//# sourceMappingURL=repository.module.spec.js.map