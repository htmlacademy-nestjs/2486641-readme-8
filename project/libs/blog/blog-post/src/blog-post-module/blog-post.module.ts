import { Module } from '@nestjs/common';
import { BlogPostModuleService } from './blog-post.service';
import { BlogPostModuleController } from './blog-post.controller';

@Module({
  controllers: [BlogPostModuleController],
  providers: [BlogPostModuleService],
})
export class BlogPostModuleModule {}
