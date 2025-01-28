import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

import { SortDirection } from '@project/core';

import {
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_PAGE_COUNT
} from './blog-post.constant';
import { ApiProperty } from '@nestjs/swagger';


export class BlogPostQuery {
  @ApiProperty({description: 'Количество записей на странице', required: false})
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  readonly limit?: number = DEFAULT_POST_COUNT_LIMIT;

  @ApiProperty({description: 'Тэги', required: false})
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @ApiProperty({description: 'Направление сортировки', enum: SortDirection, required: false})
  //@IsIn(Object.values(SortDirection))
  @IsEnum(SortDirection)
  @IsOptional()
  public sortDirection?: SortDirection = DEFAULT_SORT_DIRECTION;

  @ApiProperty({description: 'Номер страницы', required: false})
  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;

  @ApiProperty({description: 'Идентификатор автора публикаций', required: false})
  @IsMongoId()
  @IsOptional()
  public userId?: string;
}