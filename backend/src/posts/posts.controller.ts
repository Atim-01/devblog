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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse, ApiQuery, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Public routes (no authentication required)
  @Get()
  @ApiOperation({ 
    summary: 'Get all blog posts',
    description: 'Retrieves a list of all published blog posts. This is a public endpoint that does not require authentication. Posts are returned with author information and sorted by creation date (newest first).'
  })
  @ApiOkResponse({ description: 'List of all blog posts', schema: { example: { message: 'Posts retrieved successfully', data: [{ id: 'uuid', title: 'Sample', content: '...', authorId: 'uuid', createdAt: '2025-09-04T02:00:00.000Z', updatedAt: '2025-09-04T02:00:00.000Z', author: { id: 'uuid', username: 'johndoe' } }] } } })
  async findAll() {
    const posts = await this.postsService.findAll();
    
    return {
      message: 'Posts retrieved successfully',
      data: posts,
    };
  }

  @Get('search')
  @ApiOperation({ 
    summary: 'Search blog posts',
    description: 'Searches through blog posts by title and content. The search is case-insensitive and returns posts that contain the search query in either the title or content. Query parameter is required.'
  })
  @ApiQuery({ name: 'q', required: true, example: 'nestjs', description: 'Search query to find posts by title or content' })
  @ApiOkResponse({ description: 'Search results for blog posts', schema: { example: { message: 'Search results retrieved successfully', data: [] } } })
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
  @ApiOperation({ 
    summary: 'Get posts by tag',
    description: 'Retrieves all blog posts that are tagged with a specific tag. This is useful for filtering posts by topics or categories.'
  })
  @ApiParam({ name: 'tag', description: 'The tag to filter posts by', example: 'javascript' })
  @ApiOkResponse({ description: 'Posts filtered by tag', schema: { example: { message: 'Posts by tag retrieved successfully', data: [] } } })
  async getPostsByTag(@Param('tag') tag: string) {
    const posts = await this.postsService.getPostsByTag(tag);
    
    return {
      message: 'Posts by tag retrieved successfully',
      data: posts,
    };
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a single blog post',
    description: 'Retrieves a specific blog post by its ID. This is a public endpoint that returns the full post content along with author information.'
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the blog post', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiOkResponse({ description: 'Single blog post details', schema: { example: { message: 'Post retrieved successfully', data: { id: 'uuid', title: 'Sample', content: '...', authorId: 'uuid', author: { id: 'uuid', username: 'johndoe' } } } } })
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
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Create a new blog post',
    description: 'Creates a new blog post. This endpoint requires authentication - include the JWT token in the Authorization header. The authenticated user will be set as the author of the post.'
  })
  @ApiBody({ type: CreatePostDto })
  @ApiCreatedResponse({ description: 'Blog post created successfully', schema: { example: { message: 'Post created successfully', data: { id: 'uuid', title: 'Understanding NestJS', content: '...', authorId: 'uuid' } } } })
  async create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: any) {
    const post = await this.postsService.create(createPostDto, user.id);
    
    return {
      message: 'Post created successfully',
      data: post,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Update a blog post',
    description: 'Updates an existing blog post. This endpoint requires authentication and you can only update posts that you created. Include the JWT token in the Authorization header.'
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the blog post to update', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdatePostDto })
  @ApiOkResponse({ description: 'Blog post updated successfully', schema: { example: { message: 'Post updated successfully', data: { id: 'uuid', title: 'Updated title', content: '...' } } } })
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: any,
  ) {
    const post = await this.postsService.update(id, updatePostDto, user.id);
    
    return {
      message: 'Post updated successfully',
      data: post,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Delete a blog post',
    description: 'Permanently deletes a blog post. This endpoint requires authentication and you can only delete posts that you created. Include the JWT token in the Authorization header.'
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the blog post to delete', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiNoContentResponse({ description: 'Blog post deleted successfully' })
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    await this.postsService.remove(id, user.id);
    
    return {
      message: 'Post deleted successfully',
    };
  }
}
