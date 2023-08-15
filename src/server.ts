import mongoose from "mongoose";
import { app } from "./app";
import { config } from "./config/config";
import { connectDB } from "./db/connect-db";
import { startMetricsServer } from "./utils/metrics-server.utils";

const main = async () => {
  try {
    const PORT = config.PORT || 4000;
    await connectDB(config.MONGODB_URI);
    startMetricsServer();
    const server = app.listen(PORT, () =>
      console.log(`App Running on PORT: ${PORT}`)
    );

    ["SIGINT", "SIGTERM"].forEach((signal) => {
      process.on(signal, () => {
        console.log("App shutdown");
        mongoose.connection.close();
        server.close();
      });
    });
  } catch (err) {
    console.error("Some thing went wrong!");
    process.exit(1);
  }
};

main();
