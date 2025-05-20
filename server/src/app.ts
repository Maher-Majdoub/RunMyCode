import { handleIoConnection } from "./socket";
import { createServer } from "http";
import { Server } from "socket.io";
import api from "./routes/api";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use(api);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:5173"] },
});

io.on("connect", handleIoConnection);

export { httpServer, io };
