import { Injectable } from '@nestjs/common';
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
    const newPost = new BlogPostEntity(dto)
    await this.blogPostRepository.save(newPost);
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

  public async remove(id: string): Promise<void> {
    return await this.blogPostRepository.deleteById(id);
  }

  public async sendPosts() {
    const documents = await this.blogPostRepository.findAndUpdateForSend();
    const posts = documents.map((item) => new BlogPostEntity(item).toPOJO());
    return this.notifyService.sendNewPosts(posts)
  }
}
