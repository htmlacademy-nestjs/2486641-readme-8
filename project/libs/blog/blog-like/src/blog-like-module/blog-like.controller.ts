import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';

const MOCK_USER_ID = '658170cbb954e9f5b905ccf4'; // TODO: Далее будет получаться из JWT

@Controller('posts/:postId/likes')
export class BlogLikeController {
  constructor(private readonly blogLikeService: BlogLikeService) { }

  @Post('/')
  create(@Param('postId') postId: string) {
    return this.blogLikeService.create(postId, MOCK_USER_ID);
  }

  @Get('/')
  findAll(@Param('postId') postId: string) {
    return this.blogLikeService.findByPostId(postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogLikeService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogLikeService.remove(id);
  }
}
