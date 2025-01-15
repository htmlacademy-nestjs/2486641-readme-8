import { Module } from '@nestjs/common';
import { BlogLikeModule } from '@project/blog-like';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogPostModule } from '@project/blog-post';
import { NotifyModule } from '@project/blog-notify';
import { BlogConfigModule } from '@project/blog-config';

@Module({
  imports: [
    BlogLikeModule, 
    BlogCommentModule, 
    BlogPostModule, 
    NotifyModule,
    BlogConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
