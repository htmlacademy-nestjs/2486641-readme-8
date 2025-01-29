import { Expose } from 'class-transformer';
import { BlogPostRdo } from './blog-post.rdo';
import { ApiProperty } from '@nestjs/swagger';


export class BlogPostWithPaginationRdo {
  @Expose()
  @ApiProperty({description: 'Данные', type: [BlogPostRdo]})
  public entities: BlogPostRdo[];

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