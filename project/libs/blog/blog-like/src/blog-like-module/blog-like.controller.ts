import {
  Controller,
  Post,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogLikeEntity } from './blog-like.entity';

@ApiTags('Лайки к публикациям')
@Controller('posts/:postId/likes')
export class BlogLikeController {
  constructor(private readonly blogLikeService: BlogLikeService) { }

  @Post('/')
  @ApiOperation({ summary: 'Поставить лайк публикации.' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Like created', type: BlogLikeEntity })
  public async create(
    @Param('postId') postId: string,
    @Query('userId') userId: string,
  ) {
    return await this.blogLikeService.create(postId, userId);
  }

  @Delete('/')
  @ApiOperation({ summary: 'Убрать лайк у публикации.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Like deleted' })
  public async remove(
    @Param('postId') postId: string,
    @Query('userId') userId: string,
  ) {
    return await this.blogLikeService.remove(postId, userId);
  }
}
