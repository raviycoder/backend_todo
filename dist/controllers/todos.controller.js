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
exports.restoreTodo = exports.getDeletedTodos = exports.getUncompletedTodos = exports.getCompletedTodos = exports.uncompletedTodo = exports.completedTodo = exports.updateTodo = exports.deleteTodo = exports.getTodos = exports.createTodo = void 0;
const todos_model_1 = __importDefault(require("../models/todos.model"));
const decode_1 = require("../utils/decode");
function createTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, alarmAt } = req.body;
            if (!title) {
                return res.status(400).json({ message: "Title is required" });
            }
            const user = yield (0, decode_1.decodeUser)(req.cookies.token);
            if (!user)
                return res.status(401).json({ message: "Unauthorized" });
            const newTodo = new todos_model_1.default({
                title,
                description,
                userId: user === null || user === void 0 ? void 0 : user._id,
                alarmAt,
            });
            const savedTodo = yield newTodo.save();
            return res
                .status(201)
                .json({ message: "Todo successfully created", savedTodo });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.createTodo = createTodo;
function getTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, decode_1.decodeUser)(req.cookies.token);
            if (!user)
                return res.status(401).json({ message: "Unauthorized" });
            const todos = yield todos_model_1.default.find({ userId: user === null || user === void 0 ? void 0 : user._id, deletedAt: false });
            return res
                .status(200)
                .json({ message: "Todos fetched successfully", todos });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.getTodos = getTodos;
function deleteTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { isdeleteData } = req.body;
            if (isdeleteData) {
                const todo = yield todos_model_1.default.findByIdAndDelete(id);
                return res
                    .status(200)
                    .json({ message: "Todo deleted successfully", todo });
            }
            else {
                const todo = yield todos_model_1.default.findByIdAndUpdate(id, { deletedAt: true }, { new: true });
                return res
                    .status(200)
                    .json({ message: "Todo deleted successfully", todo });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.deleteTodo = deleteTodo;
function updateTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const todo = yield todos_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({ message: "Todo updated successfully", todo });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.updateTodo = updateTodo;
function completedTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            console.log("hero", id);
            const todo = yield todos_model_1.default.findByIdAndUpdate(id, { completed: true }, { new: true });
            return res
                .status(200)
                .json({ message: "Todo completed successfully", todo });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.completedTodo = completedTodo;
function uncompletedTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const todo = yield todos_model_1.default.findByIdAndUpdate(id, { completed: false }, { new: true });
            return res
                .status(200)
                .json({ message: "Todo uncompleted successfully", todo });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.uncompletedTodo = uncompletedTodo;
function getCompletedTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, decode_1.decodeUser)(req.cookies.token);
            if (!user)
                return res.status(401).json({ message: "Unauthorized" });
            const todos = yield todos_model_1.default.find({ userId: user === null || user === void 0 ? void 0 : user._id, completed: true, deletedAt: false });
            return res
                .status(200)
                .json({ message: "Completed todos fetched successfully", todos });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.getCompletedTodos = getCompletedTodos;
function getUncompletedTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, decode_1.decodeUser)(req.cookies.token);
            if (!user)
                return res.status(401).json({ message: "Unauthorized" });
            const todos = yield todos_model_1.default.find({ userId: user === null || user === void 0 ? void 0 : user._id, completed: false, deletedAt: false });
            return res
                .status(200)
                .json({ message: "Uncompleted todos fetched successfully", todos });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.getUncompletedTodos = getUncompletedTodos;
function getDeletedTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, decode_1.decodeUser)(req.cookies.token);
            if (!user)
                return res.status(401).json({ message: "Unauthorized" });
            const todos = yield todos_model_1.default.find({ userId: user === null || user === void 0 ? void 0 : user._id, deletedAt: true });
            return res
                .status(200)
                .json({ message: "Deleted todos fetched successfully", todos });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.getDeletedTodos = getDeletedTodos;
function restoreTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const todo = yield todos_model_1.default.findByIdAndUpdate(id, { deletedAt: false }, { new: true });
            return res
                .status(200)
                .json({ message: "Todo restored successfully", todo });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.restoreTodo = restoreTodo;
