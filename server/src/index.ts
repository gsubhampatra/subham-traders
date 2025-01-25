import { createApp } from "./app";
import { logger } from "./utils/logger";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const app = createApp();

    app.listen(PORT, () => {
      logger.info(`Server running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();
