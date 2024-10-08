"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
// import protect from "../middleware/authMiddleware";
const router = (0, express_1.Router)();
// router.use(protect)
router.get('/getUser/:id', user_1.getUser);
router.get('/getUsers', user_1.getUsers);
router.put('/updateUser/:id', user_1.updateUser);
router.delete('/deleteUser/:id', user_1.deleteUser);
exports.default = router;
