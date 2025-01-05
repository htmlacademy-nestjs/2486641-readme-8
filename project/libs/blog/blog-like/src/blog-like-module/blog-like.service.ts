import { Injectable } from '@nestjs/common';
import { CreateBlogLikeDto } from './dto/create-blog-like.dto';
import { UpdateBlogLikeDto } from './dto/update-blog-like.dto';

@Injectable()
export class BlogLikeService {
  create(createBlogLikeDto: CreateBlogLikeDto) {
    return 'This action adds a new blogLike';
  }

  findAll() {
    return `This action returns all blogLike`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogLike`;
  }

  update(id: number, updateBlogLikeDto: UpdateBlogLikeDto) {
    return `This action updates a #${id} blogLike`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogLike`;
  }
}
