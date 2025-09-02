import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Dev-Blog API! 🚀';
  }

  getHealth(): { status: string; timestamp: string; uptime: number } {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  getApiInfo(): { name: string; version: string; description: string; endpoints: string[] } {
    return {
      name: 'Dev-Blog API',
      version: '1.0.0',
      description: 'A RESTful API for the Dev-Blog platform built with NestJS',
      endpoints: [
        'GET / - Welcome message',
        'GET /health - Health check',
        'GET /api-info - API information',
        'POST /api/auth/register - User registration',
        'POST /api/auth/login - User login',
        'GET /api/posts - Get all blog posts',
        'GET /api/posts/:id - Get single blog post',
        'POST /api/posts - Create new blog post (authenticated)',
        'PATCH /api/posts/:id - Update blog post (authenticated, own posts only)',
        'DELETE /api/posts/:id - Delete blog post (authenticated, own posts only)',
      ],
    };
  }
}
