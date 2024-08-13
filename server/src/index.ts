import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth"
import userRoute from "./routes/user"
import blogRoute from "./routes/blog"
import errorHandler from "./middleware/errorHandler";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT! || 3001;
const mongoUri = process.env.MONGODB_URI!;


//cors middleware
const allowedOrigins = ['http://localhost:5173', "https://universeblog.vercel.app"];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "../src/uploads")));


// routes
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/blogs', blogRoute)


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome here");
});

//error handler middleware
app.use(errorHandler);

if (!mongoUri) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}


//connect to mongoDb
mongoose.set("strictQuery", false);
mongoose.connect(mongoUri).then(() => {
  app.listen(port, () => {
    console.log(`server is listening on port ${port}!`);
    console.log(`It's fun time!`);
  });
});


