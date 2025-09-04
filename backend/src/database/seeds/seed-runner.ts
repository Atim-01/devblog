import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';
import { usersSeedData } from './users.seed';
import { postsSeedData } from './posts.seed';
import { SeedUser, SeedPost } from './seed-data.interface';

export class SeedRunner {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    try {
      console.log('🌱 Starting database seeding...');

      // Clear existing data
      await this.clearData();

      // Seed users
      const users = await this.seedUsers();
      console.log(`✅ Created ${users.length} users`);

      // Seed posts
      const posts = await this.seedPosts(users);
      console.log(`✅ Created ${posts.length} posts`);

      console.log('🎉 Database seeding completed successfully!');
    } catch (error) {
      console.error('❌ Error during seeding:', error);
      throw error;
    }
  }

  private async clearData(): Promise<void> {
    console.log('🧹 Clearing existing data...');
    
    // Delete posts first (due to foreign key constraints)
    await this.dataSource.getRepository(Post).delete({});
    await this.dataSource.getRepository(User).delete({});
    
    console.log('✅ Existing data cleared');
  }

  private async seedUsers(): Promise<User[]> {
    console.log('👥 Seeding users...');
    
    const userRepository = this.dataSource.getRepository(User);
    const users: User[] = [];

    for (const userData of usersSeedData) {
      const user = userRepository.create({
        username: userData.username,
        password: userData.password, // Will be hashed by the entity's @BeforeInsert hook
      });

      const savedUser = await userRepository.save(user);
      users.push(savedUser);
    }

    return users;
  }

  private async seedPosts(users: User[]): Promise<Post[]> {
    console.log('📝 Seeding posts...');
    
    const postRepository = this.dataSource.getRepository(Post);
    const posts: Post[] = [];

    // Create a map of username to user ID for easy lookup
    const userMap = new Map<string, string>();
    users.forEach(user => {
      userMap.set(user.username, user.id);
    });

    for (const postData of postsSeedData) {
      const authorId = userMap.get(postData.authorUsername);
      
      if (!authorId) {
        console.warn(`⚠️  User '${postData.authorUsername}' not found for post '${postData.title}'`);
        continue;
      }

      const post = postRepository.create({
        title: postData.title,
        content: postData.content,
        authorId: authorId,
      });

      const savedPost = await postRepository.save(post);
      posts.push(savedPost);
    }

    return posts;
  }

  async verifySeeding(): Promise<void> {
    console.log('🔍 Verifying seeded data...');
    
    const userCount = await this.dataSource.getRepository(User).count();
    const postCount = await this.dataSource.getRepository(Post).count();
    
    console.log(`📊 Verification results:`);
    console.log(`   - Users: ${userCount}`);
    console.log(`   - Posts: ${postCount}`);
    
    if (userCount === 0 || postCount === 0) {
      throw new Error('Seeding verification failed: No data found');
    }
    
    console.log('✅ Seeding verification passed');
  }
}
