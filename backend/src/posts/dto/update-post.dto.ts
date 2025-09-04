import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional({ example: 'Updated title for the blog post' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({ example: 'Updated content of the blog post with more details and examples.' })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(10000)
  content?: string;
}
