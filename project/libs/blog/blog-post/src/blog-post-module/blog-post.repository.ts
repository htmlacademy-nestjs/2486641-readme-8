import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {

}