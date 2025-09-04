import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Understanding NestJS with TypeORM' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'In this post, we explore how to use NestJS with TypeORM to build scalable APIs...' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10000) // Allow for substantial blog content
  content: string;
}
