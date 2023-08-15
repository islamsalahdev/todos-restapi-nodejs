import "express-async-errors";
import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response } from "express";
import cors from "cors";
import responseTime from "response-time";
import { config } from "./config/config";

import { errorsHandlermiddleware, notFoundMiddleware } from "./middelwares";
import { restResponseTimeHistogram } from "./utils/metrics-server.utils";

import apiRouter from "./routes";

export const app = express();

// Middelwares
app.use(
  cors({
    origin: config.ORIGIN,
  })
);

app.use(express.json());

app.use(
  responseTime((req: Request, res: Response, time) => {
    if (req.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.originalUrl,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

// Routes
app.use("/api", apiRouter);

// Custom Middelwares
app.use(errorsHandlermiddleware);
app.use(notFoundMiddleware);
