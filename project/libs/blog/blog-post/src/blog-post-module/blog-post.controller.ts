import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogPostModuleService } from './blog-post.service';
import { CreateBlogPostModuleDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostModuleDto } from './dto/update-blog-post.dto';

@Controller('blog-post-module')
export class BlogPostModuleController {
  constructor(private readonly blogPostModuleService: BlogPostModuleService) {}

  @Post()
  create(@Body() createBlogPostModuleDto: CreateBlogPostModuleDto) {
    return this.blogPostModuleService.create(createBlogPostModuleDto);
  }

  @Get()
  findAll() {
    return this.blogPostModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogPostModuleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogPostModuleDto: UpdateBlogPostModuleDto
  ) {
    return this.blogPostModuleService.update(+id, updateBlogPostModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogPostModuleService.remove(+id);
  }
}
