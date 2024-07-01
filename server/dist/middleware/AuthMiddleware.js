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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.ACCESS_TOKEN_SECRET;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ message: 'Not Authorized, Pls Login' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log(decoded.userID);
        console.log("hello");
        // const user = await User.findById(decoded.userID).select('-password');
        // (req as any).user = user
        // console.log(user)
        req.body.user = decoded;
        next();
    }
    catch (error) {
        res.sendStatus(401);
    }
    // try {
    //     const decoded = jwt.verify(token, secret);
    //     // Attach user information to request object
    //     req.body.user = decoded;
    //     next();
    //   } catch (error) {
    //     return res.status(401).json({ message: 'Invalid or expired token' });
    //   }
    // jwt.verify(token, secret, (err, user) => {
    //     if (err) {
    //       return res.sendStatus(403); // Forbidden
    //     }
    //    ( req as any).user = user;
    //     next();
    //   });
});
exports.protect = protect;
