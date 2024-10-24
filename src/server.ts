import buildApp from "./app";
import { PrismaClient } from "@prisma/client";
import { envConfig } from "./shared/config/env";
import { logger } from "./shared/logger";

const prisma = new PrismaClient();

const startServer = async () => {
  const app = buildApp();

  try {
    await prisma.$connect();
    logger.info("Successfully connected to the database");

    const address = await app.listen({ port: envConfig.port, host: "0.0.0.0" });
    logger.info(`Server is running on ${address}`);
    logger.info(`API documentation available at ${address}/documentation`);
    logger.info(`Welcome route: ${address}`);
    logger.info(`API routes: ${address}/api/v1/*`);
  } catch (err) {
    logger.error("Error starting server:", { error: err });
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on("SIGINT", async () => {
  logger.info("Shutting down server...");
  await prisma.$disconnect();
  logger.info("Database connection closed");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("Shutting down server...");
  await prisma.$disconnect();
  logger.info("Database connection closed");
  process.exit(0);
});
