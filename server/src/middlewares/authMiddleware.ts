import { Request, Response, NextFunction } from "express";
import { io } from "../app";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const socketId = req.header("x-socket-id");

  if (!socketId) {
    res.status(400).send({ message: "Socket ID not provided" });
    return;
  }

  if (typeof socketId !== "string") {
    res.status(400).send({ message: "Socket ID must be a string" });
    return;
  }

  if (!io.sockets.sockets.has(socketId)) {
    res.status(404).send({ message: "Invalid or non-existent Socket ID" });
    return;
  }

  req.body.socketId = socketId;

  next();
};
