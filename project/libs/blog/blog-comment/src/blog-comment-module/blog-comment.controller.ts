import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

const MOCK_USER_ID = '658170cbb954e9f5b905ccf4'; // TODO: Далее будет получаться из JWT

@Controller('posts/:postId/comments')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) { }

  @Post()
  create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    return this.blogCommentService.create(postId, MOCK_USER_ID, dto);
  }

  @Get()
  findAll(@Param('postId') postId: string) {
    return this.blogCommentService.findByPostId(postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogCommentService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogCommentService.remove(id);
  }
}
