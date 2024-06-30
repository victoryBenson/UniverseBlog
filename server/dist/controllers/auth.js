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
exports.userLogin = exports.userRegister = void 0;
const user_1 = __importDefault(require("../models/user"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//user login
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email }).lean();
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        const token = (0, generateToken_1.default)(user.id);
        const expiryDate = new Date(Date.now() + 24 * (3600000)); //expire in 24hrs
        res
            .status(201)
            .json(user)
            .header("authorization", `Bearer ${token}`)
            .cookie("token", token, { httpOnly: true, secure: true, expires: expiryDate });
    }
    catch (err) {
        next(err);
    }
});
exports.userLogin = userLogin;
//register user
const userRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: 'All field are required' });
            return;
        }
        const duplicateUser = yield user_1.default.findOne({ email });
        if (duplicateUser) {
            res.status(400).json({ message: 'Email is already in use' });
            return;
        }
        const newUser = new user_1.default({ username, email, password });
        yield newUser.save();
        const token = (0, generateToken_1.default)(newUser.id);
        const expiryDate = new Date(Date.now() + 24 * (3600000)); //expire in 24hrs
        res
            .status(201)
            .json(newUser)
            .header("authorization", `Bearer ${token}`)
            .cookie("token", token, { httpOnly: true, secure: true, expires: expiryDate });
    }
    catch (err) {
        next(err);
    }
});
exports.userRegister = userRegister;
