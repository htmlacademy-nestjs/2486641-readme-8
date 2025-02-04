import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { DEFAULT_COMMENT_COUNT_LIMIT, DEFAULT_PAGE_COUNT } from "./blog-comment.constant";

export class BlogCommentQuery {
  @ApiProperty({description: 'Количество записей на странице', required: false})
  @Transform(({ value }) => +value || DEFAULT_COMMENT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  readonly limit?: number = DEFAULT_COMMENT_COUNT_LIMIT;

  @ApiProperty({description: 'Номер страницы', required: false})
  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;
}