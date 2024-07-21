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
exports.getLabels = exports.updateBlog = exports.deleteBlog = exports.createBlog = exports.getBlogs = exports.getBlog = void 0;
const blog_1 = __importDefault(require("../models/blog"));
const mongoose_1 = require("mongoose");
//create_blog
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBlog = new blog_1.default(req.body);
        if (!newBlog) {
            return res.status(204).json({ message: "no content found!" });
        }
        const savedBlog = yield newBlog.save();
        res.status(201).json(savedBlog);
    }
    catch (err) {
        next(err);
    }
});
exports.createBlog = createBlog;
//get_blog
const getBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_1.default.find({}).sort("-createdAt");
        if (!blogs) {
            return res.status(400).json({ message: "blog not found" });
        }
        ;
        res.status(200).json(blogs);
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
            return res.status(400).json({ message: "blog does not exist!" });
        }
        res.status(200).json(blog);
    }
    catch (err) {
        next(err);
    }
});
exports.getBlog = getBlog;
//deleteBlog
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    try {
        if (!blogId) {
            return res.status(400).json({ message: "Invalid blog Id" });
        }
        const blog = yield blog_1.default.findByIdAndDelete(blogId);
        if (!blog) {
            return res.status(400).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
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
            return res.status(400).json({ message: "Invalid blog Id" });
        }
        const blogDetails = req.body;
        const options = { new: true, runValidators: true };
        const blog = yield blog_1.default.findByIdAndUpdate(blogId, blogDetails, options);
        if (!blog) {
            return res.status(400).json({ message: "Blog does not exist" });
        }
        res.status(200).json({ message: "Updated successfully!" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBlog = updateBlog;
const getLabels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Labels = yield blog_1.default.find({ label: req.params.tag });
        res.json(Labels);
    }
    catch (error) {
        next(error);
    }
});
exports.getLabels = getLabels;
