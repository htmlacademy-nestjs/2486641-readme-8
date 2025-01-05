import { Injectable } from '@nestjs/common';
import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeEntity } from './blog-like.entity';

@Injectable()
export class BlogLikeService {
  constructor(
    private readonly blogLikeRepository: BlogLikeRepository
  ) { }
  public async create(postId: string, userId: string): Promise<BlogLikeEntity> {
    const newLike = new BlogLikeEntity({ postId, userId })
    await this.blogLikeRepository.save(newLike);
    return newLike;
  }

  public async findByPostId(postId: string) {
    return await this.blogLikeRepository.findByPostId(postId);
  }

  public async findById(id: string) {
    return await this.blogLikeRepository.findById(id);
  }

  public async remove(id: string) {
    return await this.blogLikeRepository.deleteById(id);
  }
}
