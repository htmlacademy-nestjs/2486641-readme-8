import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostQuery } from './blog-post.query';
import { PaginationResult } from '@project/core';
import { NotifyService } from '@project/blog-notify';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly notifyService: NotifyService
  ) { }

  public async create(dto: CreatePostDto): Promise<BlogPostEntity> {
    const newPost = new BlogPostEntity({...dto, comments: [], likes: []})
    await this.blogPostRepository.save(newPost);
    //await this.notifyService.createPostMail({ id: newPost.id, postDate: newPost.postDate, type: newPost.type, userId: newPost.userId });
    return newPost;
  }

  public async findAll(query: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    return await this.blogPostRepository.findAll(query);
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    return await this.blogPostRepository.findById(id);
  }

  public async update(id: string, dto: UpdatePostDto) {
    return `This action updates a #${id} blogPostModule`;
  }

  public async remove(id: string, userId: string): Promise<void> {
    const post = await this.findById(id);
    if (post.userId !== userId) {
      throw new HttpException('Запрещено удалять чужие посты', HttpStatus.BAD_REQUEST);
    }
    return await this.blogPostRepository.deleteById(id);
  }

  public async sendPosts() {
    const documents = await this.blogPostRepository.findAndUpdateForSend();
    if (!documents.length) {
      return;
    }
    const posts = documents.map((item) => new BlogPostEntity(item).toPOJO());
    return this.notifyService.sendPosts(posts)
  }
}
