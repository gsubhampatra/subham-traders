import { Request } from "express";
class Logger {
  info(message: string) {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
  }

  error(message: string, error?: unknown) {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
  }

  logRequest(req: Request) {
    console.log(
      `[REQUEST] ${new Date().toISOString()}: ${req.method} ${req.url}`
    );
  }
}

export const logger = new Logger();
