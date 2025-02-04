import { Expose } from 'class-transformer';
import { BlogPostRdo } from './blog-post.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationRdo } from '@project/core';


export class BlogPostWithPaginationRdo extends PaginationRdo {
  @Expose()
  @ApiProperty({ description: 'Данные', type: [BlogPostRdo] })
  public entities: BlogPostRdo[];
}