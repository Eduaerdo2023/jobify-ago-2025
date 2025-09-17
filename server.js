import "express-async-errors";

import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
const cloudinaryV2 = cloudinary.v2;


// routers
import jobRouter from "./routers/jobRouter.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";

// public
import {dirname} from 'path'
import { fileURLToPath } from "url";
import path from "path";

// middlewares
import errorHandlerMiddleware  from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleWare.js";

cloudinaryV2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const PORT = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, './public')))

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "Hello from the server!" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth",  authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'))
});


app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});
app.use(errorHandlerMiddleware);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong!" });
});
