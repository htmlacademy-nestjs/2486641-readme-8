import { BasePostgresRepository } from '@project/data-access';
import { Comment, PaginationResult } from "@project/core";
import { BlogCommentEntity } from "./blog-comment.entity";
import { BlogCommentFactory } from './blog-comment.factory';
import { PrismaClientService } from '@project/models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogCommentQuery } from './blog-comment.query';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity, Comment> {
  constructor(
    entityFactory: BlogCommentFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogCommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({ where: { id } });
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const document = await this.client.comment.findUnique({ where: { id } });

    if (! document) {
      throw new NotFoundException(`Comment with id = ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async findByPostId(postId: string, query: BlogCommentQuery): Promise<PaginationResult<BlogCommentEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit ? query?.limit : undefined;
    const where: Prisma.CommentWhereInput = { postId };
    const [documents, postCount] = await Promise.all([
      this.client.comment.findMany({ where, skip, take }),
      this.client.comment.count({where}),
    ]);

    return {
      entities: documents.map((document) => this.createEntityFromDocument(document)),
      currentPage: query?.page,
      totalPages: Math.ceil(postCount / take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }
}