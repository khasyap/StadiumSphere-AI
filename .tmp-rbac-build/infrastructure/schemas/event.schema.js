"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPersistenceSchema = exports.EVENT_PERSISTENCE_MODEL = void 0;
const mongoose_1 = require("mongoose");
const domain_1 = require("../../domain");
exports.EVENT_PERSISTENCE_MODEL = 'EventPersistence';
exports.EventPersistenceSchema = new mongoose_1.Schema({
    endsAt: { required: true, type: Date },
    name: { required: true, trim: true, type: String },
    startsAt: { required: true, type: Date },
    status: { default: domain_1.EventStatus.SCHEDULED, enum: Object.values(domain_1.EventStatus), required: true, type: String },
}, { collection: 'events', timestamps: true });
exports.EventPersistenceSchema.index({ startsAt: 1, endsAt: 1 }, { unique: true });
//# sourceMappingURL=event.schema.js.map