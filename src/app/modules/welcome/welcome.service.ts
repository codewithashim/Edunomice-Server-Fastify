export class WelcomeService {
    getWelcomeMessage() {
      return {
        message: 'Welcome to the Fastify API',
        documentation: '/documentation',
        apiPrefix: '/api/v1'
      };
    }
  }