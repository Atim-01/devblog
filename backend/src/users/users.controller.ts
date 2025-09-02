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

@Controller('users')
@UseGuards(JwtAuthGuard) // Protect all user routes
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    
    return {
      message: 'User created successfully',
      data: user,
    };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    
    return {
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    
    return {
      message: 'User retrieved successfully',
      data: user,
    };
  }

  @Get(':id/profile')
  async getUserProfile(@Param('id') id: string) {
    const user = await this.usersService.getUserProfile(id);
    
    return {
      message: 'User profile retrieved successfully',
      data: user,
    };
  }

  @Get(':id/posts')
  async getUserWithPosts(@Param('id') id: string) {
    const user = await this.usersService.getUserWithPosts(id);
    
    return {
      message: 'User with posts retrieved successfully',
      data: user,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    
    return {
      message: 'User updated successfully',
      data: user,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    
    return {
      message: 'User deleted successfully',
    };
  }
}
