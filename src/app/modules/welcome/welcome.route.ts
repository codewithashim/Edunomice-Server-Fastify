import { FastifyInstance } from 'fastify';
import { WelcomeController } from './welcome.controller';
import { WelcomeService } from './welcome.service';

const welcomeController = new WelcomeController(new WelcomeService());

export const welcomeRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', welcomeController.getWelcomeMessage.bind(welcomeController));
};