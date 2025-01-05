import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogLikeModule } from '@project/blog-like';
import { BlogCommentModule } from '@project/blog-comment';

@Module({
  imports: [BlogLikeModule, BlogCommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
