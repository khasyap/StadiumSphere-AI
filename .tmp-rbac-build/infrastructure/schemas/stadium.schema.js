"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StadiumPersistenceSchema = exports.STADIUM_PERSISTENCE_MODEL = void 0;
const mongoose_1 = require("mongoose");
exports.STADIUM_PERSISTENCE_MODEL = 'StadiumPersistence';
exports.StadiumPersistenceSchema = new mongoose_1.Schema({
    capacity: { required: true, type: Number },
    name: { required: true, trim: true, type: String },
}, { collection: 'stadiums', timestamps: true });
exports.StadiumPersistenceSchema.index({ name: 1 });
//# sourceMappingURL=stadium.schema.js.map