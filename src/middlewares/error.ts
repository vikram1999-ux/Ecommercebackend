import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { ControllerType } from "../types/types.js";

export const errorMiddleware: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    if (err.name === "CastError") {
        res.status(400).json({ success: false, message: "Invalid ID" });
    } else {
        res.status(statusCode).json({
            success: false,
            message,
        });
    }

    // ✅ Explicitly return void (no return statement)
};

// TryCatch Wrapper to Handle Async Errors
export const TryCatch =
    (func: ControllerType) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(func(req, res, next)).catch(next);
    };
