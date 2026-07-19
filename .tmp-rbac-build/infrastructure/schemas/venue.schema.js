"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenuePersistenceSchema = exports.VENUE_PERSISTENCE_MODEL = void 0;
const mongoose_1 = require("mongoose");
exports.VENUE_PERSISTENCE_MODEL = 'VenuePersistence';
exports.VenuePersistenceSchema = new mongoose_1.Schema({
    location: {
        address: {
            city: { type: String },
            country: { type: String },
            line1: { type: String },
            postalCode: { type: String },
        },
        latitude: { required: true, type: Number },
        longitude: { required: true, type: Number },
    },
    name: { required: true, trim: true, type: String },
}, { collection: 'venues', timestamps: true });
exports.VenuePersistenceSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });
//# sourceMappingURL=venue.schema.js.map