import { ApiProperty } from "@nestjs/swagger";
import { PostType } from "@project/core";
import { ArrayMaxSize, IsArray, IsIn, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl, Length, MaxLength, ValidateIf } from "class-validator";
import { PostValidateMessage, PostValidateValue } from "../blog-post.constant";

export class CreatePostDto {
  @ApiProperty({ description: 'Тип контента', example: PostType.text })
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  type: PostType;

  @ApiProperty({ description: 'Список тэгов', example: ['Tag1, Tag2'] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ArrayMaxSize(
    PostValidateValue.tags.maxCount,
    { message: PostValidateMessage.tags.countMessage }
  )
  @Length(
    PostValidateValue.tags.minLength,
    PostValidateValue.tags.maxLength,
    {
      each: true,
      message: PostValidateMessage.tags.lengthMessage
    }
  )
  tags?: string[];

  @ApiProperty({ description: 'Идентификатор автора публикации', example: '6766e16f90c0264a74a1f9d4' })
  @IsMongoId()
  userId: string;

  // @ApiProperty({ description: 'Дата публикации' })
  // @IsDateString()
  // @IsOptional()
  // postDate?: Date;

  // @ApiProperty({ description: 'Признак "опубликована"', example: 'true' })
  // @IsBoolean({ message: PostValidateMessage.isPublished.formatMessage })
  // isPublished: boolean;

  @ApiProperty({ description: 'Название публикации', example: 'Моя видео публикация' })
  @ValidateIf((o) => o.type === PostType.video)
  @Length(
    PostValidateValue.titleVideo.minLength,
    PostValidateValue.titleVideo.maxLength,
    { message: PostValidateMessage.titleVideo.lengthMessage }
  )
  titleVideo?: string;

  @ApiProperty({ description: 'Ссылка на видео', example: 'https://my-videos.com/example-video' })
  @ValidateIf((o) => o.type === PostType.video)
  @IsUrl()
  urlVideo?: string;

  @ApiProperty({ description: 'Название публикации',  example: 'Моя текстовая публикация'})
  @ValidateIf((o) => o.type === PostType.text)
  @Length(
    PostValidateValue.titleText.minLength,
    PostValidateValue.titleText.maxLength,
    { message: PostValidateMessage.titleText.lengthMessage }
  )
  titleText?: string;

  @ApiProperty({ description: 'Анонс публикации' })
  @ValidateIf((o) => o.type === PostType.text)
  @Length(
    PostValidateValue.previewText.minLength,
    PostValidateValue.previewText.maxLength,
    { message: PostValidateMessage.previewText.lengthMessage }
  )
  previewText?: string;

  @ApiProperty({ description: 'Текст публикации' })
  @ValidateIf((o) => o.type === PostType.text)
  @IsNotEmpty()
  @IsString()
  @Length(
    PostValidateValue.text.minLength, 
    PostValidateValue.text.maxLength, 
    { message: PostValidateMessage.text.lengthMessage }
  )
  text?: string;

  @ApiProperty({ description: 'Текст цитаты' })
  @ValidateIf((o) => o.type === PostType.quote)
  @IsString()
  @Length(
    PostValidateValue.textQuote.minLength, 
    PostValidateValue.textQuote.maxLength, 
    { message: PostValidateMessage.textQuote.lengthMessage }
  )
  textQuote?: string;
  
  @ApiProperty({ description: 'Автор цитаты' })
  @ValidateIf((o) => o.type === PostType.quote)
  @IsString()
  @Length(
    PostValidateValue.authorQuote.minLength, 
    PostValidateValue.authorQuote.maxLength, 
    { message: PostValidateMessage.authorQuote.lengthMessage }
  )
  authorQuote?: string;

  @ApiProperty({ description: 'Фотография' })
  @ValidateIf((o) => o.type === PostType.photo)
  @IsUrl()
  urlPhoto?: string;

  @ApiProperty({ description: 'Ссылка' })
  @ValidateIf((o) => o.type === PostType.link)
  @IsUrl()
  urlLink?: string;

  @ApiProperty({ description: 'Описание ссылки' })
  @ValidateIf((o) => o.type === PostType.link)
  @IsOptional()
  @IsString()
  @MaxLength(
    PostValidateValue.descriptionLink.maxLength, 
    { message: PostValidateMessage.descriptionLink.lengthMessage }
  )
  descriptionLink?: string;
}
