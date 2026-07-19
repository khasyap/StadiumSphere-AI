"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportPersistenceSchema = exports.SPORT_PERSISTENCE_MODEL = void 0;
const mongoose_1 = require("mongoose");
exports.SPORT_PERSISTENCE_MODEL = 'SportPersistence';
exports.SportPersistenceSchema = new mongoose_1.Schema({
    name: { required: true, trim: true, type: String },
}, { collection: 'sports', timestamps: true });
exports.SportPersistenceSchema.index({ name: 1 }, { unique: true });
//# sourceMappingURL=sport.schema.js.map