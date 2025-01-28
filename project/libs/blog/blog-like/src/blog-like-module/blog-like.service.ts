import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeEntity } from './blog-like.entity';
import { BlogPostService } from '@project/blog-post';

@Injectable()
export class BlogLikeService {
  constructor(
    private readonly blogLikeRepository: BlogLikeRepository,
    private readonly blogPostService: BlogPostService
  ) { }
  public async create(postId: string, userId: string): Promise<BlogLikeEntity> {
    const post = await this.blogPostService.findById(postId);
    if (!post.isPublished) {
      throw new HttpException('Пользователи могут оставлять лайки для публикаций, которые находятся в состоянии «Опубликована».', HttpStatus.BAD_REQUEST);
    }
    if ((await this.findByPostId(postId)).find((like) => like.userId === userId)) {
      throw new HttpException('Пользователь может оставить только один лайк для конкретной публикации.', HttpStatus.BAD_REQUEST);
    }
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
