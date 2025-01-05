import { Module } from '@nestjs/common';
import { BlogPostModuleService } from './blog-post.service';
import { BlogPostModuleController } from './blog-post.controller';
import { PrismaClientModule } from '@project/models';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostFactory } from './blog-post.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogPostModuleController],
  providers: [BlogPostModuleService, BlogPostFactory, BlogPostRepository],
  exports: [BlogPostModuleService],
})
export class BlogPostModuleModule {}
