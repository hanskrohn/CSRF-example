import express from "express";
import { getBalance, transfer, login } from "../controllers/accountController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/balance", auth, getBalance);

router.post("/transfer/:to/:amount", auth, transfer);
router.post("/login", login);

export { router };
