"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = require("../controllers/blog");
const ImageUploadConfig_1 = __importDefault(require("../utils/ImageUploadConfig"));
// import { upload } from '../utils/CloudinaryConfig';
const router = (0, express_1.Router)();
router.get('/getBlogs', blog_1.getBlogs);
router.get('/getBlog/:id', blog_1.getBlog);
router.get("/getLabel/:label", blog_1.getLabels);
router.post("/write_blog", ImageUploadConfig_1.default.single("image"), blog_1.createBlog);
router.patch("/update_blog/:id", ImageUploadConfig_1.default.single("image"), blog_1.updateBlog);
router.delete("/delete_blog/:id", blog_1.deleteBlog);
exports.default = router;
