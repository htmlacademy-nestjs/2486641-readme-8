import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostQuery } from './blog-post.query';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogPostRdo } from './rdo/blog-post.rdo';
import { fillDto } from '@project/helpers';
import { BlogPostWithPaginationRdo } from './rdo/blog-post-with-pagination.rdo';

@ApiTags('Публикации в блоге')
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Создание новой публикации.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: BlogPostRdo })
  public async create(@Body() dto: CreatePostDto) {
    return this.blogPostService.create(dto);
  }

  @Get('/')
  @ApiOperation({ summary: 'Получение списка публикаций.' })
  @ApiResponse({ status: HttpStatus.OK, type: BlogPostWithPaginationRdo })
  public async findAll(@Query() query: BlogPostQuery) {
    const posts = await this.blogPostService.findAll(query);
    const result = {
      ...posts,
      entities: posts.entities.map((post) => post.toPOJO()),
    }
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @Get('/send')
  public async send() {
    return this.blogPostService.sendPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Просмотр детальной информации о публикации.' })
  @ApiResponse({ status: HttpStatus.OK, type: BlogPostRdo })
  public async findOne(@Param('id') id: string) {
    const post = await this.blogPostService.findById(id);
    return fillDto(BlogPostRdo, post);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Редактирование публикации.' })
  @ApiResponse({ status: HttpStatus.CREATED })
  public async update(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() dto: UpdatePostDto
  ) {
    return this.blogPostService.update(id, userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление публикации.' })
  @ApiResponse({ status: HttpStatus.OK })
  public async remove(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    return this.blogPostService.remove(id, userId);
  }

  @Post('/:id/repost')
  @ApiOperation({ summary: 'Репост публикации.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: BlogPostRdo })
  public async repost(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    console.log('userId=',userId);
    return this.blogPostService.repost(id, userId);
  }
}
