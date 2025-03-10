import { NextFunction, Request, Response, RequestHandler  } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { ControllerType } from "../types/types.js";

export const errorMiddleware = (
    err: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === "CastError") message = "Invalid ID";

    return res.status(statusCode).json({
        success: false,
        message,
    });
};

export const TryCatch =
(func: ControllerType): RequestHandler =>
(req: Request, res: Response, next: NextFunction) => {
Promise.resolve(func(req, res, next)).catch(next);
};