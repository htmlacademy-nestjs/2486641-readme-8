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
import { fillDto } from '@project/helpers';
import { CommentRdo } from './rdo/comment.rdo';

const MOCK_USER_ID = '658170cbb954e9f5b905ccf4'; // TODO: Далее будет получаться из JWT

@Controller('posts/:postId/comments')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) { }

  @Post()
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const comment = await this.blogCommentService.create(postId, MOCK_USER_ID, dto);
    return fillDto(CommentRdo, comment.toPOJO());
  }

  @Get()
  public async findAll(@Param('postId') postId: string) {
    const comments = await this.blogCommentService.findByPostId(postId);
    return fillDto(CommentRdo, comments.map((comment) => comment.toPOJO()));
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const comment = await this.blogCommentService.findById(id);
    return fillDto(CommentRdo, comment.toPOJO());
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.blogCommentService.remove(id);
  }
}
