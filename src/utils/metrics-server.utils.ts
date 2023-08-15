import express from "express";
import client from "prom-client";
import { config } from "../config/config";

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "Rest Response Time in Second",
  labelNames: ["method", "route", "status_code"],
});

export const dbResponseTimeHistogram = new client.Histogram({
  name: "database_response_time_duration_seconds",
  help: "Database Response Time in Second",
  labelNames: ["operation", "success"],
});

export const startMetricsServer = () => {
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics();

  app.get("/metrics", async (_, res) => {
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  });

  const metricsPort = config.METRICS_PORT || 9000;

  app.listen(metricsPort, () => {
    console.log(`MetricsServer Running on PORT: ${metricsPort}`);
  });
};
