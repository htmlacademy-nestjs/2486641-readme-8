import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository
  ) { }
  public async create(postId: string, userId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const newComment = new BlogCommentEntity({ postId, userId, ...dto });
    await this.blogCommentRepository.save(newComment);
    return newComment;
  }

  public async findByPostId(postId: string) {
    return await this.blogCommentRepository.findByPostId(postId);
  }

  public async findById(id: string) {
    return await this.blogCommentRepository.findById(id);
  }

  public async remove(id: string) {
    return await this.blogCommentRepository.deleteById(id);
  }
}
