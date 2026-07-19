"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingPersistenceSchema = exports.BOOKING_PERSISTENCE_MODEL = void 0;
const mongoose_1 = require("mongoose");
const domain_1 = require("../../domain");
exports.BOOKING_PERSISTENCE_MODEL = 'BookingPersistence';
exports.BookingPersistenceSchema = new mongoose_1.Schema({
    eventId: { required: true, trim: true, type: String },
    reference: { required: true, trim: true, type: String },
    status: { default: domain_1.BookingStatus.PENDING, enum: Object.values(domain_1.BookingStatus), required: true, type: String },
}, { collection: 'bookings', timestamps: true });
exports.BookingPersistenceSchema.index({ reference: 1 }, { unique: true });
exports.BookingPersistenceSchema.index({ eventId: 1 });
//# sourceMappingURL=booking.schema.js.map