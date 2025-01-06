import { BasePostgresRepository } from '@project/data-access';
import { BlogLikeEntity } from './blog-like.entity';
import { Like } from '@project/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogLikeFactory } from './blog-like.factory';
import { PrismaClientService } from '@project/models';

@Injectable()
export class BlogLikeRepository extends BasePostgresRepository<BlogLikeEntity, Like> {
  constructor(
    entityFactory: BlogLikeFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogLikeEntity): Promise<void> {
    const record = await this.client.like.create({
      data: {...entity.toPOJO()}
    });

    entity.id = record.id;
  }

  public async findById(id: string): Promise<BlogLikeEntity> {
    const document = await this.client.like.findUnique({where: {id}});

    if (!document) {
      throw new NotFoundException(`Like with id = ${id} not found`);
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.like.delete({where: {id}});
  }

  public async findByPostId(postId: string): Promise<BlogLikeEntity[]> {
    const documents = await this.client.like.findMany({where: {postId}});

    return documents.map((document) => this.createEntityFromDocument(document));
  }
}