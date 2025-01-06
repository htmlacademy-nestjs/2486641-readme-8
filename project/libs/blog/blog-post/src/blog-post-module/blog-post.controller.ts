import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class BlogPostModuleController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Post('/')
  create(@Body() dto: CreatePostDto) {
    return this.blogPostService.create(dto);
  }

  @Get('/')
  findAll() {
    return this.blogPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogPostService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto
  ) {
    return this.blogPostService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogPostService.remove(id);
  }
}
