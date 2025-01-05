import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';
import { CreateBlogLikeDto } from './dto/create-blog-like.dto';
import { UpdateBlogLikeDto } from './dto/update-blog-like.dto';

@Controller('blog-like')
export class BlogLikeController {
  constructor(private readonly blogLikeService: BlogLikeService) {}

  @Post()
  create(@Body() createBlogLikeDto: CreateBlogLikeDto) {
    return this.blogLikeService.create(createBlogLikeDto);
  }

  @Get()
  findAll() {
    return this.blogLikeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogLikeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogLikeDto: UpdateBlogLikeDto
  ) {
    return this.blogLikeService.update(+id, updateBlogLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogLikeService.remove(+id);
  }
}
