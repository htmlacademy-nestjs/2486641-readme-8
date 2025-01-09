import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { BlogPostEntity } from './blog-post.entity';
import { Post, PostType } from '@project/core';
import { BlogPostFactory } from './blog-post.factory';
import { PrismaClientService } from '@project/models';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogPostEntity): Promise<void> {
    const data = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        ...data,
        comments: {
          connect: [],
        },
        likes: {
          connect: [],
        }
      }
    });

    entity.id = record.id;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({ where: { id } });
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findUnique({
      where: { id },
      include: { comments: true, likes: true }
    });

    if (!document) {
      throw new NotFoundException(`Post with id = ${id} not found.`);
    }

    return this.createEntityFromDocument({...document, type: document.type as PostType});
  }

  public async findAll(): Promise<BlogPostEntity[]> {
    const documents = await this.client.post.findMany({ include: { comments: true, likes: true } });
    return documents.map((document) => this.createEntityFromDocument({...document, type: document.type as PostType}));
  }
}