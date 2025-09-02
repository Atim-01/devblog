import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Public routes (no authentication required)
  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();
    
    return {
      message: 'Posts retrieved successfully',
      data: posts,
    };
  }

  @Get('search')
  async searchPosts(@Query('q') query: string) {
    if (!query) {
      return {
        message: 'Search query is required',
        data: [],
      };
    }

    const posts = await this.postsService.searchPosts(query);
    
    return {
      message: 'Search results retrieved successfully',
      data: posts,
    };
  }

  @Get('tag/:tag')
  async getPostsByTag(@Param('tag') tag: string) {
    const posts = await this.postsService.getPostsByTag(tag);
    
    return {
      message: 'Posts by tag retrieved successfully',
      data: posts,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    
    return {
      message: 'Post retrieved successfully',
      data: post,
    };
  }

  // Protected routes (authentication required)
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostDto: CreatePostDto, @Request() req: any) {
    const post = await this.postsService.create(createPostDto, req.user.id);
    
    return {
      message: 'Post created successfully',
      data: post,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req: any,
  ) {
    const post = await this.postsService.update(id, updatePostDto, req.user.id);
    
    return {
      message: 'Post updated successfully',
      data: post,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Request() req: any) {
    await this.postsService.remove(id, req.user.id);
    
    return {
      message: 'Post deleted successfully',
    };
  }

  // Get posts by specific author (public route)
  @Get('author/:authorId')
  async findByAuthor(@Param('authorId') authorId: string) {
    const posts = await this.postsService.findByAuthor(authorId);
    
    return {
      message: 'Posts by author retrieved successfully',
      data: posts,
    };
  }
}
