import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Create new user
    const user = this.userRepository.create({
      username,
      password, // Password will be hashed by entity hook
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<Partial<User>[]> {
    const users = await this.userRepository.find({
      select: ['id', 'username', 'createdAt', 'updatedAt'], // Exclude password
    });
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'createdAt', 'updatedAt'], // Exclude password
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if new username already exists (if username is being updated)
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.userRepository.findOne({
        where: { username: updateUserDto.username },
      });

      if (existingUser) {
        throw new ConflictException('Username already exists');
      }
    }

    // Update user
    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);

    // Return user without password
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
  }

  async getUserProfile(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserWithPosts(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
      select: ['id', 'username', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
