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
  public async create(@Param('postId') postId: string) {
    return await this.blogLikeService.create(postId, MOCK_USER_ID);
  }

  @Get('/')
  public async findAll(@Param('postId') postId: string) {
    return await this.blogLikeService.findByPostId(postId);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.blogLikeService.findById(id);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.blogLikeService.remove(id);
  }
}
