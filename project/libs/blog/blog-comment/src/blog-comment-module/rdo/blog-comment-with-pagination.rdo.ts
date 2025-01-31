import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BlogCommentRdo } from './blog-comment.rdo';


export class BlogCommentWithPaginationRdo {
  @Expose()
  @ApiProperty({description: 'Данные', type: [BlogCommentRdo]})
  public entities: BlogCommentRdo[];

  @Expose()
  @ApiProperty({description: 'Всего страниц'})
  public totalPages: number;

  @Expose()
  @ApiProperty({description: 'Всего записей'})
  public totalItems: number;

  @Expose()
  @ApiProperty({description: 'Текущая страница'})
  public currentPage: number;

  @Expose()
  @ApiProperty({description: 'Записей на странице'})
  public itemsPerPage: number;
}