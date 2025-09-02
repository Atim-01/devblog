import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Response } from 'express';

export interface ResponseData<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  path: string;
  method: string;
  statusCode: number;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseData<T>>
{
  private readonly logger = new Logger(TransformInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseData<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse<Response>();
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // Log successful requests
        this.logger.log(
          `${request.method} ${request.url} - ${response.statusCode} - ${duration}ms`,
        );
      }),
      map((data) => {
        // If the response already has the expected format, return as is
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // Transform the response to consistent format
        const transformedResponse: ResponseData<T> = {
          success: true,
          message: this.extractMessage(data),
          data: this.extractData(data),
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          statusCode: response.statusCode,
        };

        return transformedResponse;
      }),
    );
  }

  private extractMessage(data: any): string {
    // Extract message from response data if available
    if (data && typeof data === 'object') {
      if (data.message) {
        return data.message;
      }
      
      // Handle array responses
      if (Array.isArray(data)) {
        return `${data.length} items retrieved successfully`;
      }
      
      // Handle object responses
      if (Object.keys(data).length > 0) {
        return 'Data retrieved successfully';
      }
    }
    
    return 'Success';
  }

  private extractData(data: any): T {
    // Extract actual data from response
    if (data && typeof data === 'object') {
      // If data has a data property, use that
      if (data.data !== undefined) {
        return data.data;
      }
      
      // If data has a message property, exclude it and return the rest
      if (data.message) {
        const { message, ...rest } = data;
        return Object.keys(rest).length > 0 ? rest : data;
      }
      
      // Return the data as is
      return data;
    }
    
    return data;
  }
}
