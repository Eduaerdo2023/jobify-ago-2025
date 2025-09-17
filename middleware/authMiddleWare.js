import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("No token provided");
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "68b8aa5982dfac1cdbaa262d";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const authorizePermission = (role) => {
  return (req, res, next) => {
    const { user } = req;
    if (!user) {
      throw new UnauthenticatedError("Not authenticated");
    }
    if (user.role !== role) {
      throw new UnauthorizedError("Not authorized");
    }
    next();
  };
};

export const checkForTestUser =  (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only");
  }
  next();
};
