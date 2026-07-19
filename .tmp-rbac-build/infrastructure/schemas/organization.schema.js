"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationPersistenceSchema = exports.ORGANIZATION_PERSISTENCE_MODEL = void 0;
const mongoose_1 = require("mongoose");
exports.ORGANIZATION_PERSISTENCE_MODEL = 'OrganizationPersistence';
exports.OrganizationPersistenceSchema = new mongoose_1.Schema({
    name: { required: true, trim: true, type: String },
}, { collection: 'organizations', timestamps: true });
exports.OrganizationPersistenceSchema.index({ name: 1 }, { unique: true });
//# sourceMappingURL=organization.schema.js.map