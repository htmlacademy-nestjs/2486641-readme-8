import { ApiProperty } from "@nestjs/swagger";
import { AppPostType } from "@project/core";

export class CreatePostDto {
  @ApiProperty({
    description: 'Тип контента'
  })
  type: AppPostType;

  @ApiProperty({
    description: 'Список тэгов'
  })
  tags?: string[];

  @ApiProperty({
    description: 'Идентификатор автора оригинальной публикации'
  })
  originalUserId?: string;

  @ApiProperty({
    description: 'Идентификатор автора публикации'
  })
  userId: string;

  @ApiProperty({
    description: 'Дата публикации'
  })
  postDate?: Date;

  @ApiProperty({
    description: 'Признак "опубликована"'
  })
  isPublished: boolean;

  @ApiProperty({
    description: 'Признак "репост"'
  })
  isReposted: boolean;

  @ApiProperty({
    description: 'Идентификатор оригинальной публикации'
  })
  originalId?: string;

  @ApiProperty({
    description: 'Ссылка на контент'
  })
  url?: string;

  @ApiProperty({
    description: 'Описание ссылки'
  })
  description?: string;

  @ApiProperty({
    description: 'Текст цитаты'
  })
  text?: string;

  @ApiProperty({
    description: 'Автор цитаты'
  })
  author?: string;

  @ApiProperty({
    description: 'Название публикации'
  })
  title?: string;

  @ApiProperty({
    description: 'Анонс публикации'
  })
  preview?: string;
}
