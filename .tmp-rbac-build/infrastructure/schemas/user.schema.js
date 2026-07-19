"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPersistenceSchema = exports.USER_PERSISTENCE_MODEL = void 0;
const mongoose_1 = require("mongoose");
const domain_1 = require("../../domain");
exports.USER_PERSISTENCE_MODEL = 'UserPersistence';
exports.UserPersistenceSchema = new mongoose_1.Schema({
    email: { required: true, trim: true, type: String },
    passwordHash: { type: String },
    refreshTokenHash: { type: String },
    role: { default: domain_1.UserRole.USER, enum: Object.values(domain_1.UserRole), required: true, type: String },
}, { collection: 'users', timestamps: true });
exports.UserPersistenceSchema.index({ email: 1 }, { unique: true });
//# sourceMappingURL=user.schema.js.map