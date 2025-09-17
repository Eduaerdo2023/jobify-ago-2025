import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        throw new BadRequestError(
          ` ${errorMessages.join(", ")}`
        );
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company")
    .notEmpty()
    .withMessage("Company name is required")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Company name must be alphanumeric")
    .isLength({ max: 50 })
    .withMessage("Company name must be at most 50 characters long"),
  body("position")
    .notEmpty()
    .withMessage("Position is required")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Position must be alphanumeric")
    .isLength({ max: 100 })
    .withMessage("Position must be at most 100 characters long"),
  body("jobLocation")
    .optional()
    .isString()
    .withMessage("Job location must be a string"),
  body("jobStatus")
    .optional()
    .isIn(Object.values(JOB_STATUS))
    .withMessage(
      `Job status must be one of: ${Object.values(JOB_STATUS).join(", ")}`
    ),
  body("jobType")
    .optional()
    .isIn(Object.values(JOB_TYPE))
    .withMessage(
      `Job type must be one of: ${Object.values(JOB_TYPE).join(", ")}`
    ),
]);

export const validateIdParam = [
  param("id")
    .notEmpty()
    .withMessage("Job ID is required")
    .isMongoId()
    .withMessage("Invalid Job ID format"),
  async (req, res, next) => {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      throw new NotFoundError(`No job found with id ${id}`);
    }
    const isAdmin = req.user.role === "admin";
    const isOwner = job.createdBy.toString() === req.user.userId;
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("Not authorized to access this route");
    }
    next();
  },
];

export const validateRegisterInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters long")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Name must be alphanumeric"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new BadRequestError("Email is already in use");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ max: 100 })
    .withMessage("Last name must be at most 100 characters long"),
  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string")
    .isLength({ max: 100 })
    .withMessage("Location must be at most 100 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters long")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Name must be alphanumeric"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user && user.id !== req.user.userId) {
        throw new BadRequestError("Email is already in use");
      }
    }),
  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string")
    .isLength({ max: 100 })
    .withMessage("Location must be at most 100 characters long"),
  body("lastName")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Last name must be between 2 and 100 characters long")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Last name must be alphanumeric"),
]);
