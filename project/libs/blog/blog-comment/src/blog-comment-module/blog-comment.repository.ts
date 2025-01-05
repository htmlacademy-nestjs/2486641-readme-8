import { BasePostgresRepository } from '@project/data-access';
import { Comment } from "@project/core";
import { BlogCommentEntity } from "./blog-comment.entity";
import { BlogCommentFactory } from './blog-comment.factory';
import { PrismaClientService } from '@project/models';
import { Injectable, NotFoundException } from '@nestjs/common';

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

  public async findByPostId(postId: string): Promise<BlogCommentEntity[]> {
    const records = await this.client.comment.findMany({ where: { postId } });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}