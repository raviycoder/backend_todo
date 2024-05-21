"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todoSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    deletedAt: { type: Boolean, default: false },
    alarmAt: { type: String, default: null }
});
exports.default = mongoose_1.default.model("Todo", todoSchema);
