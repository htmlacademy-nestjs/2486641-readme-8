import { Module } from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeController } from './blog-like.controller';
import { PrismaClientModule } from '@project/models';
import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeFactory } from './blog-like.factory';
import { BlogPostModule } from '@project/blog-post';

@Module({
  imports: [PrismaClientModule, BlogPostModule],
  controllers: [BlogLikeController],
  providers: [BlogLikeService, BlogLikeRepository, BlogLikeFactory],
  exports: [BlogLikeService]
})
export class BlogLikeModule {}
