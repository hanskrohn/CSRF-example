import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/", require("./api/routes/routes").router);

app.use(express.static(path.join(__dirname, "./static/")));

app.get("/*", (_: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, "./static/", "index.html"));
});

module.exports = app;
