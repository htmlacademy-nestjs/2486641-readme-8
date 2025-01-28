import {
  Controller,
  Post,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';

@Controller('posts/:postId/likes')
export class BlogLikeController {
  constructor(private readonly blogLikeService: BlogLikeService) { }

  @Post('/')
  public async create(
    @Param('postId') postId: string,
    @Query('userId') userId: string,
  ) {
    return await this.blogLikeService.create(postId, userId);
  }

  // @Get('/')
  // public async findAll(@Param('postId') postId: string) {
  //   return await this.blogLikeService.findByPostId(postId);
  // }

  // @Get(':id')
  // public async findOne(@Param('id') id: string) {
  //   return await this.blogLikeService.findById(id);
  // }

  @Delete('/:id')
  public async remove(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    return await this.blogLikeService.remove(id, userId);
  }
}
