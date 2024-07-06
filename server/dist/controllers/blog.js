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
exports.updateBlog = exports.deleteBlog = exports.createBlog = exports.getBlogs = exports.getBlog = void 0;
const blog_1 = __importDefault(require("../models/blog"));
const mongoose_1 = require("mongoose");
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBlog = new blog_1.default(req.body);
        const savedBlog = yield newBlog.save();
        res.sendStatus(201).json(savedBlog);
    }
    catch (err) {
        res.sendStatus(400).send(err);
    }
});
exports.createBlog = createBlog;
const getBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_1.default.find({}).sort("-createdAt");
        if (!blogs) {
            return res.sendStatus(400).json({ message: "user not found" });
        }
        ;
        res.sendStatus(200).json(blogs);
    }
    catch (error) {
        next(error);
    }
});
exports.getBlogs = getBlogs;
//single user
const getBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        if (!mongoose_1.Types.ObjectId.isValid(blogId)) {
            return res.sendStatus(400).json({ message: "Invalid blogId" });
        }
        const blog = yield blog_1.default.findById(blogId);
        if (!blog) {
            return res.sendStatus(400).json({ message: "User does not exist!" });
        }
        res.sendStatus(200).json(blog);
    }
    catch (err) {
        next(err);
    }
});
exports.getBlog = getBlog;
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    try {
        if (!blogId) {
            return res.sendStatus(400).json({ message: "Invalid blog Id" });
        }
        const blog = yield blog_1.default.findByIdAndDelete(blogId);
        if (!blog) {
            return res.sendStatus(400).json({ message: "blog not found" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBlog = deleteBlog;
const updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    try {
        if (!blogId) {
            return res.sendStatus(400).json({ message: "Invalid blog Id" });
        }
        const blogDetails = req.body;
        const options = { new: true, runValidators: true };
        const blog = yield blog_1.default.findByIdAndUpdate(blogId, blogDetails, options);
        if (!blog) {
            return res.sendStatus(400).json({ message: "user does not exist" });
        }
        res.sendStatus(200).json(blog);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBlog = updateBlog;
