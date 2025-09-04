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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth('access-token')
@Controller('users')
@UseGuards(JwtAuthGuard) // Protect all user routes
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Create a new user (Admin only)',
    description: 'Creates a new user account. This endpoint requires authentication and is typically used by administrators to create user accounts. Include the JWT token in the Authorization header.'
  })
  @ApiCreatedResponse({ description: 'User created successfully', schema: { example: { message: 'User created successfully', data: { id: 'uuid', username: 'johndoe' } } } })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    
    return {
      message: 'User created successfully',
      data: user,
    };
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all users',
    description: 'Retrieves a list of all registered users. This endpoint requires authentication and returns basic user information (excluding passwords). Include the JWT token in the Authorization header.'
  })
  @ApiOkResponse({ description: 'List of all users', schema: { example: { message: 'Users retrieved successfully', data: [{ id: 'uuid', username: 'johndoe' }] } } })
  async findAll() {
    const users = await this.usersService.findAll();
    
    return {
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a specific user',
    description: 'Retrieves detailed information about a specific user by their ID. This endpoint requires authentication. Include the JWT token in the Authorization header.'
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the user', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiOkResponse({ description: 'User details', schema: { example: { message: 'User retrieved successfully', data: { id: 'uuid', username: 'johndoe' } } } })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    
    return {
      message: 'User retrieved successfully',
      data: user,
    };
  }

  @Get(':id/profile')
  @ApiOperation({ 
    summary: 'Get user profile',
    description: 'Retrieves the public profile information of a specific user, including creation date and basic stats. This endpoint requires authentication. Include the JWT token in the Authorization header.'
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the user', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiOkResponse({ description: 'User profile information', schema: { example: { message: 'User profile retrieved successfully', data: { id: 'uuid', username: 'johndoe', createdAt: '2025-09-04T02:00:00.000Z' } } } })
  async getUserProfile(@Param('id') id: string) {
    const user = await this.usersService.getUserProfile(id);
    
    return {
      message: 'User profile retrieved successfully',
      data: user,
    };
  }

  @Get(':id/posts')
  @ApiOperation({ 
    summary: 'Get user with their posts',
    description: 'Retrieves a specific user along with all their blog posts. This endpoint requires authentication and provides a complete view of a user\'s content. Include the JWT token in the Authorization header.'
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the user', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiOkResponse({ description: 'User with their blog posts', schema: { example: { message: 'User with posts retrieved successfully', data: { id: 'uuid', username: 'johndoe', posts: [] } } } })
  async getUserWithPosts(@Param('id') id: string) {
    const user = await this.usersService.getUserWithPosts(id);
    
    return {
      message: 'User with posts retrieved successfully',
      data: user,
    };
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update user information',
    description: 'Updates the information of a specific user. This endpoint requires authentication and allows updating username and password. Include the JWT token in the Authorization header.'
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the user to update', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiOkResponse({ description: 'User updated successfully', schema: { example: { message: 'User updated successfully', data: { id: 'uuid', username: 'newusername' } } } })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    
    return {
      message: 'User updated successfully',
      data: user,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Delete a user',
    description: 'Permanently deletes a user account and all associated data. This endpoint requires authentication and should be used with caution as it cannot be undone. Include the JWT token in the Authorization header.'
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the user to delete', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiNoContentResponse({ description: 'User deleted successfully' })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    
    return {
      message: 'User deleted successfully',
    };
  }
}
