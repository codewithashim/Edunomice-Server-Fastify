import { FastifyInstance } from 'fastify';
import { welcomeRoutes } from '../modules/welcome/welcome.route';

export const routes = async (fastify: FastifyInstance) => {
  fastify.register(welcomeRoutes);
};