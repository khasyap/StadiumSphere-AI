"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const common_1 = require("@nestjs/common");
const duplicate_entity_exception_1 = require("../exceptions/duplicate-entity.exception");
const entity_not_found_exception_1 = require("../exceptions/entity-not-found.exception");
const persistence_exception_1 = require("../exceptions/persistence.exception");
const pagination_helper_1 = require("../helpers/pagination.helper");
const query_builder_1 = require("../helpers/query-builder");
class BaseRepository {
    model;
    entityName;
    constructor(model, entityName) {
        this.model = model;
        this.entityName = entityName;
    }
    async create(data) {
        return this.execute(() => this.model.create(data), 'create');
    }
    async update(id, data) {
        return this.execute(async () => {
            const document = await this.model
                .findByIdAndUpdate(id, data, { new: true, runValidators: true })
                .exec();
            if (document === null) {
                throw new entity_not_found_exception_1.EntityNotFoundException(this.entityName, id);
            }
            return document;
        }, 'update');
    }
    async delete(id) {
        await this.execute(async () => {
            const document = await this.model.findByIdAndDelete(id).exec();
            if (document === null) {
                throw new entity_not_found_exception_1.EntityNotFoundException(this.entityName, id);
            }
        }, 'delete');
    }
    async findById(id, options) {
        return this.execute(() => {
            const query = this.model.findById(id);
            this.applyReadOptions(query, options);
            return query.exec();
        }, 'find');
    }
    async findOne(filter, options) {
        return this.execute(() => {
            const query = this.model.findOne(query_builder_1.QueryBuilder.buildFilter(filter));
            this.applyReadOptions(query, options);
            return query.exec();
        }, 'find');
    }
    async findMany(options) {
        return this.execute(async () => {
            const pagination = pagination_helper_1.PaginationHelper.create(options?.pagination);
            const query = this.model.find(query_builder_1.QueryBuilder.buildFilter(options?.filter));
            this.applyReadOptions(query, options);
            query
                .skip(pagination.offset)
                .limit(pagination.limit)
                .sort(query_builder_1.QueryBuilder.buildSort(options?.sort));
            const [data, total] = await Promise.all([query.exec(), this.count(options?.filter)]);
            return pagination_helper_1.PaginationHelper.createResult(data, pagination, total);
        }, 'find');
    }
    async exists(filter) {
        return this.execute(async () => (await this.model.exists(query_builder_1.QueryBuilder.buildFilter(filter)).exec()) !== null, 'check');
    }
    async count(filter) {
        return this.execute(() => this.model.countDocuments(query_builder_1.QueryBuilder.buildFilter(filter)).exec(), 'count');
    }
    applyReadOptions(query, options) {
        if (options?.projection !== undefined) {
            query.select(options.projection);
        }
        if (options?.population !== undefined) {
            query.populate(options.population);
        }
    }
    async execute(operation, operationName) {
        try {
            return await operation();
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (this.isDuplicateKeyError(error)) {
                throw new duplicate_entity_exception_1.DuplicateEntityException(this.entityName);
            }
            throw new persistence_exception_1.PersistenceException(`Unable to ${operationName} ${this.entityName}.`);
        }
    }
    isDuplicateKeyError(error) {
        return typeof error === 'object' && error !== null && 'code' in error && error.code === 11_000;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map