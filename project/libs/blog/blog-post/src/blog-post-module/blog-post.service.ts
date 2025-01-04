import { Injectable } from '@nestjs/common';
import { CreateBlogPostModuleDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostModuleDto } from './dto/update-blog-post.dto';

@Injectable()
export class BlogPostModuleService {
  create(createBlogPostModuleDto: CreateBlogPostModuleDto) {
    return 'This action adds a new blogPostModule';
  }

  findAll() {
    return `This action returns all blogPostModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogPostModule`;
  }

  update(id: number, updateBlogPostModuleDto: UpdateBlogPostModuleDto) {
    return `This action updates a #${id} blogPostModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogPostModule`;
  }
}
