import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth"


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGODB_URI;


// Middleware to parse application/json
app.use(express.json());

// Middleware to parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/auth', authRoute)
// app.use('api/user', authRoute)


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome here");
});


if (!mongoUri) {
  console.error('MongoDB URI is not defined in the environment variables');
  process.exit(1);
}

//connect to mongoDb
mongoose.set("strictQuery", false);
mongoose.connect(mongoUri).then(() => {
  app.listen(port, () => {
    console.log(`server is listening on port ${port}!`);
    console.log(`Cook Something!`);
  });
});
