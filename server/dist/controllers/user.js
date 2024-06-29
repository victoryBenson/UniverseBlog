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
exports.deleteUser = exports.updateUser = exports.getUsers = exports.getUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = require("mongoose");
//getUsers
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({}).select("-password").sort("-createdAt");
        if (!(users === null || users === void 0 ? void 0 : users.length)) {
            return res.status(400).json({ message: "No user found!" });
        }
        res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
});
exports.getUsers = getUsers;
//single user
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user Id" });
        }
        const user = yield user_1.default.findById(userId).select('-password').sort("-createdAt");
        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
});
exports.getUser = getUser;
//update user
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }
        const userDetails = req.body;
        const options = { new: true, runValidators: true };
        const user = yield user_1.default.findByIdAndUpdate(userId, userDetails, options).select('-password').sort("-createdAt");
        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }
        // const updatedUser = await user.save();
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
});
exports.updateUser = updateUser;
//update user
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }
        const user = yield user_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }
        else {
            return res.status(200).json({ message: "User deleted successfully!" });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = deleteUser;
