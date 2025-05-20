import { uploadExecutionFilesMiddleware } from "../middlewares/uploadExcecutionFilesMiddleware";
import { CodeRunnerController } from "../controllers/CodeRunnerController";
import { authMiddleware } from "../middlewares/authMiddleware";
import express from "express";

const api = express.Router();

api.get("/", (req, res) => {
  res.send("Hello RunMyCode");
});

const codeRunnerController = new CodeRunnerController();

api.post(
  "/task",
  authMiddleware,
  uploadExecutionFilesMiddleware,
  codeRunnerController.execute
);

export default api;
