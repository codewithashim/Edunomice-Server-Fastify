import { ZodError } from 'zod';

interface ValidationError {
  path: string;
  message: string;
}

interface ValidationErrorResponse {
  success: boolean;
  message: string;
  errorMessages: ValidationError[];
}

export const handleZodError = (error: ZodError): ValidationErrorResponse => {
  const errors: ValidationError[] = error.errors.map(e => {
    return {
      path: e.path[e.path.length - 1].toString(),
      message: e.message,
    };
  });

  return {
    success: false,
    message: 'Validation Error',
    errorMessages: errors,
  };
};