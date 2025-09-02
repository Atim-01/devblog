import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Post } from './post.entity';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ length: 255 })
  @Exclude() // Exclude password from JSON responses
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => Post, (post) => post.author, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  posts: Post[];

  // Hash password before inserting/updating
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // Only hash if password has been modified
    if (this.password && this.password.length < 60) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  // Method to compare password
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  // Method to get user without sensitive data
  toJSON() {
    const obj = { ...this };
    delete obj.password;
    return obj;
  }
}
