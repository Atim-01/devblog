import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT', 5432),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  
  // Entity configuration
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  
  // Synchronization (only in development)
  synchronize: configService.get<string>('NODE_ENV') === 'development',
  
  // Logging (only in development)
  logging: configService.get<string>('NODE_ENV') === 'development',
  
  // SSL configuration for remote database
  ssl: configService.get<string>('NODE_ENV') === 'production' 
    ? { rejectUnauthorized: false }
    : false,
  
  // Connection pool settings
  extra: {
    max: 20, // Maximum number of connections in the pool
    connectionTimeoutMillis: 30000, // Connection timeout
    idleTimeoutMillis: 30000, // Idle connection timeout
  },
  
  // Auto-load entities
  autoLoadEntities: true,
  
  // Keep connection alive
  keepConnectionAlive: true,
});
