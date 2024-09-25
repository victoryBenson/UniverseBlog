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
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI;
//cors middleware
const allowedOrigins = ['http://localhost:5173', "https://universeblog.vercel.app"];
// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions)); //handle preflight request
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', user_1.default);
app.use('/api/blogs', blog_1.default);
app.get("/", (req, res) => {
    res.send("Welcome here");
});
//error handler middleware
app.use(errorHandler_1.default);
if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in the environment variable');
    process.exit(1);
}
//connect to mongoDb
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(port, () => {
        console.log(`server is listening on port ${port}!`);
        console.log(`Let's find the bug!`);
    });
});
