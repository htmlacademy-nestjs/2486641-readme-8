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
import { CommentRdo } from './rdo/comment.rdo';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Комментарии к публикациям')
@Controller()
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) { }

  @Post('posts/:postId/comments')
  @ApiOperation({ summary: 'Создать комментарий к публикации.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CommentRdo, description: 'Comment created' })
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const comment = await this.blogCommentService.create(postId, dto);
    return fillDto(CommentRdo, comment.toPOJO());
  }

  @Get('posts/:postId/comments')
  @ApiOperation({ summary: 'Список комментариев к публикации.' })
  @ApiResponse({ status: HttpStatus.OK, type: [CommentRdo] })
  public async findAll(@Param('postId') postId: string) {
    const comments = await this.blogCommentService.findByPostId(postId);
    return fillDto(CommentRdo, comments.map((comment) => comment.toPOJO()));
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
