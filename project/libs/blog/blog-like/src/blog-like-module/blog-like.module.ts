import { Module } from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeController } from './blog-like.controller';

@Module({
  controllers: [BlogLikeController],
  providers: [BlogLikeService],
})
export class BlogLikeModule {}
