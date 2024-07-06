"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    readTime: {
        type: String
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});
const Blog = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;
