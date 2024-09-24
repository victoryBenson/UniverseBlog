import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth"
import userRoute from "./routes/user"
import blogRoute from "./routes/blog"
import errorHandler from "./middleware/errorHandler";
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();

const app: Express = express();
const port = process.env.PORT! || 3001;
const mongoUri = process.env.MONGO_URI!;


//cors middleware
const allowedOrigins = ['http://localhost:5173', "https://universeblog.vercel.app"];

// CORS configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};


app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); //handle preflight request
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


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
  console.error('MONGO_URI is not defined in the environment variable');
  process.exit(1);
}


//connect to mongoDb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
  app.listen(port, () => {
    console.log(`server is listening on port ${port}!`);
    console.log(`Let's find the bug!`);
  });
});


