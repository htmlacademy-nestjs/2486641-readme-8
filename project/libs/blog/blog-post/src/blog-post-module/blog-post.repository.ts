import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { BlogPostEntity } from './blog-post.entity';
import { PaginationResult, Post, PostType } from '@project/core';
import { BlogPostFactory } from './blog-post.factory';
import { PrismaClientService } from '@project/models';
import { BlogPostQuery } from './blog-post.query';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
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

  public async update(entity: BlogPostEntity): Promise<void> {
    const data = entity.toPOJO();
    await this.client.post.update({
      where: { id: data.id },
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

  public async findAll(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};
    if (query?.tags) {
      where.tags = {
        hasSome: query.tags
      }
    }

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [documents, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take,
        include: { comments: true, likes: true },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: documents.map((document) => this.createEntityFromDocument({...document, type: document.type as PostType})),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }

  public async findAndUpdateForSend(): Promise<Post[]> {
    const documents = await this.client.post.findMany({include: {comments: true, likes: true}, where: {isSent: false}});
    await this.client.post.updateMany({data: {isSent: true}});
    return documents.map((document) => this.createEntityFromDocument({...document, type: document.type as PostType}));
  }
}