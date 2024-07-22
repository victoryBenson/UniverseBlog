"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.use(authMiddleware_1.default);
router.get('/getUser/:id', user_1.getUser);
router.get('/getUsers', user_1.getUsers);
router.put('/updateUser/:id', user_1.updateUser);
router.delete('/deleteUser/:id', user_1.deleteUser);
exports.default = router;
