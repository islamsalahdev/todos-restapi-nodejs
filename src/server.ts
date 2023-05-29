import { app } from "./app";
import { config } from "./config/config.service";
import { connectDB } from "./db/connect-db";

const main = async () => {
  try {
    const PORT = config.PORT || 4000;
    await connectDB(config.MONGODB_URI);
    app.listen(PORT, () => console.log(`App Running on PORT: ${PORT}`));
  } catch (error) {
    console.log("Some thing went wrong");
    process.exit(1);
  }
};

main();
