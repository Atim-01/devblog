import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto, authorId: string): Promise<Post> {
    const { title, content } = createPostDto;

    // Verify author exists
    const author = await this.userRepository.findOne({
      where: { id: authorId },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    // Create new post
    const post = this.postRepository.create({
      title,
      content,
      authorId,
    });

    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          id: true,
          username: true,
        },
      },
      order: {
        createdAt: 'DESC', // Newest posts first
      },
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          id: true,
          username: true,
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async findByAuthor(authorId: string): Promise<Post[]> {
    return this.postRepository.find({
      where: { authorId },
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          id: true,
          username: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Check if user is the author of the post
    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }

    // Update post
    Object.assign(post, updatePostDto);
    const updatedPost = await this.postRepository.save(post);

    // Return post with author info
    return this.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Check if user is the author of the post
    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    await this.postRepository.remove(post);
  }

  async searchPosts(query: string): Promise<Post[]> {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.createdAt',
        'post.updatedAt',
        'author.id',
        'author.username',
      ])
      .where('post.title ILIKE :query OR post.content ILIKE :query', {
        query: `%${query}%`,
      })
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }

  async getPostsByTag(tag: string): Promise<Post[]> {
    // This is a simple implementation - you could enhance this with a proper tagging system
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.createdAt',
        'post.updatedAt',
        'author.id',
        'author.username',
      ])
      .where('post.title ILIKE :tag OR post.content ILIKE :tag', {
        tag: `%${tag}%`,
      })
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }
}
