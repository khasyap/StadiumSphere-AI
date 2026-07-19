"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const persistence_1 = require("../persistence");
const user_repository_1 = require("./user.repository");
const user = new domain_1.User({ email: new domain_1.Email('user@example.com') }, new domain_1.UniqueEntityId('user-1'));
const document = { email: 'user@example.com', id: 'user-1' };
const createModel = () => {
    const collectionQuery = {
        exec: jest.fn().mockResolvedValue([document]),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
    };
    return {
        countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(1) }),
        create: jest.fn().mockResolvedValue(document),
        find: jest.fn().mockReturnValue(collectionQuery),
        findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
        findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
        findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
    };
};
describe('UserRepository', () => {
    it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
        const model = createModel();
        const repository = new user_repository_1.UserRepository(model);
        await expect(repository.create(user)).resolves.toBeInstanceOf(domain_1.User);
        await expect(repository.findById(new domain_1.UniqueEntityId('user-1'))).resolves.toBeInstanceOf(domain_1.User);
        await expect(repository.findAll()).resolves.toHaveLength(1);
        await expect(repository.update(new domain_1.UniqueEntityId('user-1'), user)).resolves.toBeInstanceOf(domain_1.User);
        await expect(repository.delete(new domain_1.UniqueEntityId('user-1'))).resolves.toBeUndefined();
        expect(model.create).toHaveBeenCalledWith({ email: 'user@example.com', role: domain_1.UserRole.USER });
        expect(model.findByIdAndUpdate).toHaveBeenCalledWith('user-1', { $set: { email: 'user@example.com', role: domain_1.UserRole.USER } }, { new: true, runValidators: true });
    });
    it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
        const model = createModel();
        jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });
        await expect(new user_repository_1.UserRepository(model).create(user)).rejects.toBeInstanceOf(persistence_1.DuplicateEntityException);
    });
});
//# sourceMappingURL=user.repository.spec.js.map