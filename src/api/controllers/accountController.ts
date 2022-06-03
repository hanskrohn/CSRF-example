import { Request, Response } from "express";
import { user, maliciousUser } from "../db/accounts";
import { JWT_KEY } from "../../global/jwtKey";
import jwt from "jsonwebtoken";

// Returns the authenticated uses balance
// endpoint: http://localhost:5000/api/balance
// Protected route via auth middleware
export const getBalance = (req: Request, res: Response) => {
  if (res.locals.user.userId === user.id) {
    res.status(200).send({ balance: user.balance });
  } else if (res.locals.user.userId === maliciousUser.id) {
    res.status(200).send({ balance: maliciousUser.balance });
  }
};

// Transfer money from one user to another
// endpoint: http://localhost:5000/api/transfer/:to/:amount
// Protected route via auth middleware
export const transfer = (req: Request, res: Response) => {
  const { to, amount } = req.params;

  if (res.locals.user.userId === to) {
    return res.status(400).send({ message: "Cannot transfer to yourself" });
  }

  if (res.locals.user.userId === user.id) {
    user.balance = user.balance - parseInt(amount);
    maliciousUser.balance = maliciousUser.balance + parseInt(amount);
  } else if (res.locals.user.userId === maliciousUser.id) {
    maliciousUser.balance = maliciousUser.balance - parseInt(amount);
    user.balance = user.balance + parseInt(amount);
  }

  res.status(200).send({
    message: "Updated balance",
    maliciousUser: maliciousUser.balance,
    user: user.balance,
  });
};

// Login user by sending an JWT token as an HTTP only cookie
// endpoint: http://localhost:5000/api/login
export const login = (req: Request, res: Response) => {
  const { accountID } = req.body;

  if (accountID === user.id || accountID === maliciousUser.id) {
    jwt.sign(
      {
        userId: accountID,
      },
      JWT_KEY,
      {
        expiresIn: "1h",
      },
      (error, token) => {
        res.cookie("token", token, {
          httpOnly: true,
        });
        return res.status(200).json({
          message: "Auth Successful",
        });
      }
    );
  }
};
