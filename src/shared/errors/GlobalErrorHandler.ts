import { handleZodError } from './HandleZodError';
import ApiError from './ApiError';
import { ZodError } from 'zod';
import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

export const globalErrorHandler = (
  error: FastifyError | ZodError | ApiError,
  request: FastifyRequest,
  reply: FastifyReply
): void => {
  if (error instanceof ZodError) {
    const zodError = handleZodError(error);
    reply.status(400).send(zodError);
    return;
  }

  if (error instanceof ApiError) {
    reply.status(error.statusCode).send({
      success: false,
      message: error.message,
    });
    return;
  }

  reply.status(500).send({
    success: false,
    message: 'Internal server error',
    errorMessages: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
};