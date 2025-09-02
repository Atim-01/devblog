import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'author_id' })
  authorId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    eager: false, // Don't load author by default for performance
  })
  @JoinColumn({ name: 'author_id' })
  author: User;

  // Virtual property for author username (for public responses)
  get authorUsername(): string {
    return this.author?.username || 'Unknown Author';
  }

  // Method to get post with author info
  toJSON() {
    const obj = { ...this };
    if (this.author) {
      obj.author = {
        id: this.author.id,
        username: this.author.username,
      };
    }
    return obj;
  }
}
