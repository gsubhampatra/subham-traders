import express, { Application, Request, Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import { logger } from "./utils/logger";
import router from "./routes/routes";
import bodyParser from "body-parser";
import 'dotenv/config';
export function createApp(): Application {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get("/", (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Welcome to the API",
    });
  });

  app.use("/api", router);

  app.use((req: Request, res: Response, next) => {
    logger.logRequest(req);
    next();
  });

  app.use(errorMiddleware);

  return app;
}
