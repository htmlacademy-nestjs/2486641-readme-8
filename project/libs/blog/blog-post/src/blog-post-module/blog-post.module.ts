import { Module } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { BlogPostController } from './blog-post.controller';
import { PrismaClientModule } from '@project/models';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostFactory } from './blog-post.factory';
import { NotifyModule } from '@project/blog-notify';

@Module({
  imports: [PrismaClientModule, NotifyModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostFactory, BlogPostRepository],
  exports: [BlogPostService],
})
export class BlogPostModule {}
