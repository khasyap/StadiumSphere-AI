"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoApplicationRepository = void 0;
const persistence_1 = require("../persistence");
class MongoRepositoryDelegate extends persistence_1.BaseRepository {
    constructor(model, entityName) {
        super(model, entityName);
    }
}
class MongoApplicationRepository {
    mapper;
    repository;
    constructor(model, entityName, mapper) {
        this.mapper = mapper;
        this.repository = new MongoRepositoryDelegate(model, entityName);
    }
    async create(entity) {
        const document = await this.repository.create(this.mapper.toPersistence(entity));
        return this.mapToDomain(document);
    }
    async delete(id) {
        await this.repository.delete(id.toString());
    }
    async exists(filter) {
        return this.repository.exists(filter);
    }
    async findAll() {
        const result = await this.repository.findMany({ pagination: { limit: 100 } });
        return result.data.map((document) => this.mapToDomain(document));
    }
    async findById(id) {
        const document = await this.repository.findById(id.toString());
        return document === null ? null : this.mapToDomain(document);
    }
    async findOne(filter) {
        const document = await this.repository.findOne(filter);
        return document === null ? null : this.mapToDomain(document);
    }
    async update(id, entity) {
        const document = await this.repository.update(id.toString(), {
            $set: this.mapper.toPersistence(entity),
        });
        return this.mapToDomain(document);
    }
    mapToDomain(document) {
        const persisted = document;
        return this.mapper.toDomain({
            ...persisted,
            id: persisted.id ?? persisted._id.toString(),
        });
    }
}
exports.MongoApplicationRepository = MongoApplicationRepository;
//# sourceMappingURL=mongo-application.repository.js.map