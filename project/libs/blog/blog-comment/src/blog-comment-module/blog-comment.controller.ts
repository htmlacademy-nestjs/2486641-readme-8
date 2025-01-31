import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { fillDto } from '@project/helpers';
import { BlogCommentRdo } from './rdo/blog-comment.rdo';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogCommentQuery } from './blog-comment.query';
import { BlogCommentWithPaginationRdo } from './rdo/blog-comment-with-pagination.rdo';

@ApiTags('Комментарии к публикациям')
@Controller()
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) { }

  @Post('posts/:postId/comments')
  @ApiOperation({ summary: 'Создать комментарий к публикации.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: BlogCommentRdo, description: 'Comment created' })
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const comment = await this.blogCommentService.create(postId, dto);
    return fillDto(BlogCommentRdo, comment.toPOJO());
  }

  @Get('posts/:postId/comments')
  @ApiOperation({ summary: 'Список комментариев к публикации.' })
  @ApiResponse({ status: HttpStatus.OK, type: [BlogCommentWithPaginationRdo] })
  public async findAll(
    @Param('postId') postId: string,
    @Query() query: BlogCommentQuery,
  ) {
    const comments = await this.blogCommentService.findByPostId(postId, query);
    const result = {
      ...comments,
      entities: comments.entities.map((comment) => comment.toPOJO()),
    }
    return fillDto(BlogCommentWithPaginationRdo, result);
  }

  @Delete('comments/:id')
  @ApiOperation({ summary: 'Удалить комментарий' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Comment deleted' })
  public async remove(
    @Param('id') id: string,
    @Query('userId') userId: string
  ) {
    return await this.blogCommentService.remove(id, userId);
  }
}
