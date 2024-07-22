"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const env = process.env.NODE_ENV || "development";
    if (env === "development") {
        res.status(statusCode).json({
            message: err.message,
            stack: err.stack,
            error: err
        });
    }
    else {
        res.status(statusCode).json({
            message: "Something went wrong, Pls try again!"
        });
    }
};
exports.default = errorHandler;
