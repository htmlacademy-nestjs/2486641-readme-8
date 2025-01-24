import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostQuery } from './blog-post.query';

@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService,
  ) {}

  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    return this.blogPostService.create(dto);
  }

  @Get('/')
  public async findAll(@Query() query: BlogPostQuery) {
    return this.blogPostService.findAll(query);
  }

  @Get('/send')
  public async send() {
    return this.blogPostService.sendPosts();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.blogPostService.findById(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto
  ) {
    return this.blogPostService.update(id, dto);
  }

  @Delete(':id')
  public async remove(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    console.log('userId=', userId);
    return this.blogPostService.remove(id, userId);
  }
}
