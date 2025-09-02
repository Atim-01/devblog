import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Log the error for debugging
    this.logger.error(
      `HTTP Exception: ${status} - ${request.method} ${request.url}`,
      exception.stack,
    );

    // Extract error message and details
    let message: string;
    let details: any = null;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object') {
      const responseObj = exceptionResponse as any;
      message = responseObj.message || 'Internal server error';
      
      // Include validation errors if available
      if (responseObj.errors && Array.isArray(responseObj.errors)) {
        details = responseObj.errors;
      }
      
      // Include error property if available
      if (responseObj.error) {
        details = details || {};
        details.error = responseObj.error;
      }
    } else {
      message = 'Internal server error';
    }

    // Create consistent error response format
    const errorResponse = {
      success: false,
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      ...(details && { details }),
    };

    // Handle specific status codes
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        errorResponse.message = 'Bad Request';
        break;
      case HttpStatus.UNAUTHORIZED:
        errorResponse.message = 'Unauthorized';
        break;
      case HttpStatus.FORBIDDEN:
        errorResponse.message = 'Forbidden';
        break;
      case HttpStatus.NOT_FOUND:
        errorResponse.message = 'Resource not found';
        break;
      case HttpStatus.CONFLICT:
        errorResponse.message = 'Conflict';
        break;
      case HttpStatus.UNPROCESSABLE_ENTITY:
        errorResponse.message = 'Validation failed';
        break;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        errorResponse.message = 'Internal server error';
        break;
    }

    response.status(status).json(errorResponse);
  }
}
