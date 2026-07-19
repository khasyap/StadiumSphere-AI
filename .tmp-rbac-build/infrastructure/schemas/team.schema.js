"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamPersistenceSchema = exports.TEAM_PERSISTENCE_MODEL = void 0;
const mongoose_1 = require("mongoose");
exports.TEAM_PERSISTENCE_MODEL = 'TeamPersistence';
exports.TeamPersistenceSchema = new mongoose_1.Schema({
    name: { required: true, trim: true, type: String },
    sportId: { index: true, required: true, type: String },
    sportName: { required: true, trim: true, type: String },
}, { collection: 'teams', timestamps: true });
exports.TeamPersistenceSchema.index({ name: 1, sportId: 1 }, { unique: true });
//# sourceMappingURL=team.schema.js.map