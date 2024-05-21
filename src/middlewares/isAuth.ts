import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/auth.model";
import dotenv from "dotenv";
dotenv.config();

export async function isAuth(req: Request, res: Response, next: NextFunction) {
    try {
        // Extract token from request cookies
        const token = req.cookies.token;
        console.log("fdfd",req.cookies);

        // If no token, return unauthorized response
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verify token using JWT secret
        const decodedToken = Jwt.verify(token, process.env.JWT_SECRET as string);

        // Check the type of the decoded token and extract the user ID
        let userId: string;
        if (typeof decodedToken === "string") {
            // Handle the case where the decoded token is a string (unlikely but handle it)
            return res.status(401).json({ message: "Invalid token payload" });
        } else {
            // Extract user ID from JwtPayload object
            const jwtPayload = decodedToken as JwtPayload;
            userId = jwtPayload.id as string;
        }

        // Fetch the user from the database using the extracted user ID
        const user = await User.findById(userId);
        console.log(user);

        // If no user found, return unauthorized response
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Attach the user object to the request object
        // req.user = user;
        
        // Call the next middleware function
        next();
    } catch (error) {
        console.error("Error in isAuth middleware:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}