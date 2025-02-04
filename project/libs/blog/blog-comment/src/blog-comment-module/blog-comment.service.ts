import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentQuery } from './blog-comment.query';
import { PaginationResult } from '@project/core';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository
  ) { }
  public async create(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const newComment = new BlogCommentEntity({ postId, ...dto });
    await this.blogCommentRepository.save(newComment);
    return newComment;
  }

  public async findByPostId(postId: string, query: BlogCommentQuery): Promise<PaginationResult<BlogCommentEntity>> {
    return await this.blogCommentRepository.findByPostId(postId, query);
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    return await this.blogCommentRepository.findById(id);
  }

  public async remove(id: string, userId: string): Promise<void> {
    const comment = await this.findById(id);
    if (comment.userId !== userId) {
      throw new HttpException('Запрещено удалять чужие комментарии', HttpStatus.BAD_REQUEST);
    }
    return await this.blogCommentRepository.deleteById(id);
  }
}
