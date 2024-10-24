import fastify, {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
} from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { logger } from "./shared/logger";
import { globalErrorHandler } from "./shared/errors/GlobalErrorHandler";
import { routes } from "./app/routes";

const buildApp = (): FastifyInstance<
  Server<typeof IncomingMessage, typeof ServerResponse>,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  FastifyTypeProviderDefault
> => {
  const app = fastify({
    logger: logger as any,
  });


  // Register plugins
  app.register(swagger, {
    swagger: {
      info: {
        title: "Fastify API",
        description: "API documentation",
        version: "1.0.0",
      },
    },
  });

  app.register(swaggerUi, {
    routePrefix: "/documentation",
  });

  // Welcome route
  app.get("/", async (request, reply) => {
    return reply.send({
      message: "Welcome to the Noorify Education Platform",
      documentation: "/documentation",
      apiPrefix: "/api/v1",
    });
  });

  // Register routes
  app.register(routes, { prefix: "/api/v1" });

  // Global error handler
  app.setErrorHandler(globalErrorHandler);

  return app;
};

export default buildApp;
