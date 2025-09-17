import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;
  let  queryObject  ={}
  if(req.user.role !== 'admin') {
    queryObject = { createdBy: req.user.userId };
  }
 
  console.log(req.user.role);
  
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    a_z: "position",
    z_a: "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions["newest"];

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job: job });
};
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const data = req.body;
  const { position, company, location, status } = data;
  if (!position || !company || !location || !status) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all values" });
  }
  const job = await Job.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Job created successfully", job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { position, company, jobLocation, jobStatus, jobType } = req.body;
  const job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: "Job updated successfully", job });
};

// export const updateJob = async(req, res) => {
//   const { id } = req.params;
//   const { position, company, location, status } = req.body;

//   const job = await Job.findById(id);
//   if (!job) {
//     return res.status(404).json({ msg: `No job with id ${id}` });
//   }

//   if (position) job.position = position;
//   if (company) job.company = company;
//   if (location) job.location = location;
//   if (status) job.status = status;

//   res
//     .status(200)
//     .json({
//       msg: "Job updated successfully",
//       position,
//       company,
//       location,
//       status,
//     });
// };
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: "Job deleted successfully" });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count || 0;
    return acc;
  }, {});

  let monthlyApplications = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: -1 },
    },
    {
      $limit: 6,
    },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      return {
        date: day()
          .month(month - 1)
          .year(year)
          .format("MMM YYYY"),
        count,
      };
    })
    .reverse();

  res.send({ stats: stats, monthlyApplications });
};
