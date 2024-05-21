"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                // Use a regex for basic email validaXtion
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    password: { type: String, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", userSchema);
