import { Module } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentController } from './blog-comment.controller';
import { PrismaClientModule } from '@project/models';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentRepository } from './blog-comment.repository';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentFactory, BlogCommentRepository],
  exports: [BlogCommentService]
})
export class BlogCommentModule {}
