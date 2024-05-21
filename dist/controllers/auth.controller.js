"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateUser = exports.getUser = exports.login = exports.createUser = void 0;
const auth_model_1 = __importDefault(require("../models/auth.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const decode_1 = require("../utils/decode");
dotenv_1.default.config();
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            console.log(username, email, password);
            if (!username || !email || !password) {
                return res.status(422).json({ message: "This feilds are Required" });
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 10);
            const addUser = new auth_model_1.default({
                username,
                email,
                password: hashPassword,
            });
            const user = yield addUser.save();
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
            res.cookie('todo_token', token, { httpOnly: false, maxAge: 24 * 60 * 60 * 1000, });
            return res.status(200).json({ message: "Signup successful", token: token });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    });
}
exports.createUser = createUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield auth_model_1.default.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
            res.cookie('todo_token', token, { httpOnly: false, secure: true, maxAge: 24 * 60 * 60 * 1000, });
            return res.status(200).json({ message: "Login successful", token: token });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    });
}
exports.login = login;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = yield (0, decode_1.decodeUser)(req.cookies.todo_token);
            const user = yield auth_model_1.default.findById(userId === null || userId === void 0 ? void 0 : userId._id);
            return res.status(200).json({ message: "User fetched", user });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    });
}
exports.getUser = getUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = yield (0, decode_1.decodeUser)(req.cookies.todo_token);
            const { username, email } = req.body;
            if (!username || !email) {
                return res.status(422).json({ message: "This feilds are Required" });
            }
            const user = yield auth_model_1.default.findByIdAndUpdate(userId === null || userId === void 0 ? void 0 : userId._id, { username, email }, { new: true });
            return res.status(200).json({ message: "User updated", user });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    });
}
exports.updateUser = updateUser;
function updatePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = yield (0, decode_1.decodeUser)(req.cookies.todo_token);
            const { oldPassword, newPassword } = req.body;
            const user = yield auth_model_1.default.findById(userId === null || userId === void 0 ? void 0 : userId._id);
            const isMatch = yield bcrypt_1.default.compare(oldPassword, user === null || user === void 0 ? void 0 : user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const hashPassword = yield bcrypt_1.default.hash(newPassword, 10);
            const updatedUser = yield auth_model_1.default.findByIdAndUpdate(userId === null || userId === void 0 ? void 0 : userId._id, { password: hashPassword }, { new: true });
            return res.status(200).json({ message: "Password updated", updatedUser });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    });
}
exports.updatePassword = updatePassword;
