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
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = __importDefault(require("../models/auth.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function isAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract token from request cookies
            const token = req.cookies.token;
            console.log("fdfd", req.cookies);
            // If no token, return unauthorized response
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            // Verify token using JWT secret
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // Check the type of the decoded token and extract the user ID
            let userId;
            if (typeof decodedToken === "string") {
                // Handle the case where the decoded token is a string (unlikely but handle it)
                return res.status(401).json({ message: "Invalid token payload" });
            }
            else {
                // Extract user ID from JwtPayload object
                const jwtPayload = decodedToken;
                userId = jwtPayload.id;
            }
            // Fetch the user from the database using the extracted user ID
            const user = yield auth_model_1.default.findById(userId);
            console.log(user);
            // If no user found, return unauthorized response
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            // Attach the user object to the request object
            // req.user = user;
            // Call the next middleware function
            next();
        }
        catch (error) {
            console.error("Error in isAuth middleware:", error);
            return res.status(401).json({ message: "Unauthorized" });
        }
    });
}
exports.isAuth = isAuth;
