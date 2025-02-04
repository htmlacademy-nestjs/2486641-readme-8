import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BlogCommentRdo } from './blog-comment.rdo';
import { PaginationRdo } from '@project/core';


export class BlogCommentWithPaginationRdo extends PaginationRdo {
  @Expose()
  @ApiProperty({description: 'Данные', type: [BlogCommentRdo]})
  public entities: BlogCommentRdo[];
}