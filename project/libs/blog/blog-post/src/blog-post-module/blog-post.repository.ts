import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { BlogPostEntity } from './blog-post.entity';
import { PaginationResult, Post, PostType } from '@project/core';
import { BlogPostFactory } from './blog-post.factory';
import { PrismaClientService } from '@project/models';
import { BlogPostQuery } from './blog-post.query';
import { Prisma } from '@prisma/client';
import { SortField } from './blog-post.constant';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: BlogPostEntity): Promise<void> {
    const data = entity.toPOJO();
    const record = await this.client.post.create({ data });

    entity.id = record.id;
  }

  public async update(entity: BlogPostEntity): Promise<void> {
    const data = entity.toPOJO();
    await this.client.post.update({
      where: { id: data.id },
      data
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({ where: { id } });
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findUnique({
      where: { id },
      include: { _count: { select: { comments: true, likes: true } } },
    });

    if (!document) {
      throw new NotFoundException(`Post with id = ${id} not found.`);
    }

    return this.createEntityFromDocument(
      {
        ...document,
        type: document.type as PostType,
        commentsCount: document._count.comments,
        likesCount: document._count.likes
      }
    );
  }

  public async findAll(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit ? query?.limit : undefined;
    const where: Prisma.PostWhereInput = { isPublished: true };
    let orderBy: Prisma.PostOrderByWithRelationInput = {};
    if (query.sortField === SortField.CommentsCount) {
      orderBy = { comments: { _count: query.sortDirection } };
    }
    if (query.sortField === SortField.LikesCount) {
      orderBy = { likes: { _count: query.sortDirection } };
    }
    if (query.sortField === SortField.PostDate) {
      orderBy = { postDate: query.sortDirection };
    }

    if (query?.tag) {
      where.tags = {
        has: query.tag
      }
    }

    if (query?.userId) {
      where.userId = {
        equals: query?.userId
      }
    }

    if (query?.postType) {
      where.type = {
        equals: query?.postType
      }
    }

    const [documents, postCount] = await Promise.all([
      this.client.post.findMany({
        where, orderBy, skip, take,
        include: { _count: { select: { comments: true, likes: true } } },
      }),
      this.client.post.count({ where }),
    ]);

    return {
      entities: documents.map(
        (document) => this.createEntityFromDocument(
          {
            ...document,
            type: document.type as PostType,
            commentsCount: document._count.comments,
            likesCount: document._count.likes
          }
        )
      ),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }

  public async findAndUpdateForSend(): Promise<Post[]> {
    const documents = await this.client.post.findMany({ where: { isSent: false } });
    await this.client.post.updateMany({ data: { isSent: true } });
    return documents.map((document) => this.createEntityFromDocument({ ...document, type: document.type as PostType }));
  }

  public async getDrafts(userId: string) {
    const documents = await this.client.post.findMany({ where: { userId, isPublished: false }, include: { _count: { select: { comments: true, likes: true } } }, })
    return documents.map((document) => this.createEntityFromDocument({
      ...document,
      type: document.type as PostType,
      commentsCount: document._count.comments,
      likesCount: document._count.likes
    }));
  }
}