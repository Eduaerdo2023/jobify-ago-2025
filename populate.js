import dotenv from "dotenv";
dotenv.config();
import { readFile } from "fs/promises";
import mongoose from "mongoose";

import Job from "./models/jobModel.js";
import User from "./models/userModel.js";

try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: "juan@gmail.com" });
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    job.createdBy = user._id;
    return job;
  });
  console.log(jobs);
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("Jobs added");
  process.exit(0);
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}
