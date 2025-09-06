import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { SeedRunner } from './seed-runner';
import { DataSource } from 'typeorm';

async function bootstrap() {
  console.log('🚀 Starting seed script...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  
  const seedRunner = new SeedRunner(dataSource);
  
  try {
    await seedRunner.run();
    await seedRunner.verifySeeding();
    console.log('✨ Seeding completed successfully!');
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();
