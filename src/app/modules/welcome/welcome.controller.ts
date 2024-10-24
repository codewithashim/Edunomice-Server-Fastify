import { FastifyReply, FastifyRequest } from 'fastify';
import { WelcomeService } from './welcome.service';

export class WelcomeController {
  constructor(private welcomeService: WelcomeService) {}

  async getWelcomeMessage(request: FastifyRequest, reply: FastifyReply) {
    const message = this.welcomeService.getWelcomeMessage();
    return reply.send(message);
  }
}