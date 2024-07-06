"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const blog_1 = __importDefault(require("./routes/blog"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGODB_URI;
// Middleware to parse application/json
app.use(express_1.default.json());
// Middleware to parse application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', user_1.default);
app.use('/api/blog', blog_1.default);
app.get("/", (req, res) => {
    res.send("Welcome here");
});
//error handler middleware
app.use(errorHandler_1.default);
if (!mongoUri) {
    console.error('MongoDB URI is not defined in the environment variables');
    process.exit(1);
}
//connect to mongoDb
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(mongoUri).then(() => {
    app.listen(port, () => {
        console.log(`server is listening on port ${port}!`);
        console.log(`Cook Something!`);
    });
});
