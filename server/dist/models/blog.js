"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    author: {
        type: String,
        required: true,
        lowercase: true
    },
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    content: {
        type: String,
        required: true
    },
    readTime: {
        type: String,
        required: true,
        lowercase: true
    },
    label: {
        type: String,
        required: true,
        lowercase: true
    },
    image: {
        type: String,
        default: "https://i.postimg.cc/CKswg3qB/focused-tech.jpg"
    }
}, {
    timestamps: true
});
const Blog = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;
