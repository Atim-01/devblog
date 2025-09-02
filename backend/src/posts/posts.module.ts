import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    // TypeORM repositories for Post and User entities
    TypeOrmModule.forFeature([Post, User]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService, TypeOrmModule], // Export for use in other modules
})
export class PostsModule {}
