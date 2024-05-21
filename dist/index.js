"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // enable set cookie
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS',
        'PATCH', 'HEAD'],
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//routes
app.use("/api/auth", auth_route_1.default);
app.use('/api/todo', todo_route_1.default);
(0, connectDB_1.default)(); // Call the connectDB function to establish database connection
app.listen(8080, () => {
    console.log('Server running on port 8080');
});
