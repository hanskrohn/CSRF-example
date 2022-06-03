import { Request, Response, NextFunction } from "express";
import { JWT_KEY } from "../../global/jwtKey";

const jwt = require("jsonwebtoken");

// Validates JWT token before proceeding to the next function
export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_KEY);

    // Store decoded data for future use
    res.locals.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
};
