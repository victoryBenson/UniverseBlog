"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.get('/getUser/:id', user_1.getUser);
router.get('/getUsers', user_1.getUsers);
router.patch('/updateUser', user_1.updateUser);
exports.default = router;
