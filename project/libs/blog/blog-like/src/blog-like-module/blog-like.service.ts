import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  public async findByPostId(postId: string): Promise<BlogLikeEntity[]> {
    return await this.blogLikeRepository.findByPostId(postId);
  }

  public async findById(id: string): Promise<BlogLikeEntity> {
    return await this.blogLikeRepository.findById(id);
  }

  public async remove(id: string, userId: string): Promise<void> {
    const like = await this.findById(id);
    if (like.userId !== userId) {
      throw new HttpException('Невозможно удалить лайк другого пользователя', HttpStatus.BAD_REQUEST);
    }
    return await this.blogLikeRepository.deleteById(id);
  }
}
