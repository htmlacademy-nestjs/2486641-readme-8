import { ApiProperty } from "@nestjs/swagger";
import { PostType } from "@project/core";
import { ArrayMaxSize, IsArray, IsBoolean, IsDateString, IsIn, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl, Length, MaxLength, ValidateIf } from "class-validator";
import { PostValidateMessage, PostValidateValue } from "../blog-post.constant";

export class CreatePostDto {
  @ApiProperty({ description: 'Тип контента' })
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  type: PostType;

  @ApiProperty({ description: 'Список тэгов' })
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

  @ApiProperty({ description: 'Идентификатор автора публикации' })
  @IsMongoId()
  userId: string;

  @ApiProperty({ description: 'Дата публикации' })
  @IsDateString()
  @IsOptional()
  postDate?: Date;

  @ApiProperty({ description: 'Признак "опубликована"' })
  @IsBoolean({ message: PostValidateMessage.isPublished.formatMessage })
  isPublished: boolean;

  @ApiProperty({ description: 'Название публикации' })
  @ValidateIf((o) => o.type === PostType.video)
  @Length(
    PostValidateValue.titleVideo.minLength,
    PostValidateValue.titleVideo.maxLength,
    { message: PostValidateMessage.titleVideo.lengthMessage }
  )
  titleVideo?: string;

  @ApiProperty({ description: 'Ссылка на видео' })
  @ValidateIf((o) => o.type === PostType.video)
  @IsUrl()
  urlVideo?: string;

  @ApiProperty({ description: 'Название публикации' })
  @ValidateIf((o) => o.type === PostType.text)
  @Length(
    PostValidateValue.titleText.minLength,
    PostValidateValue.titleText.maxLength,
    { message: PostValidateMessage.titleText.lengthMessage }
  )
  titleText?: string;

  @ApiProperty({ description: 'Анонс публикации' })
  @IsOptional()
  @ValidateIf((o) => o.type === PostType.text)
  @Length(
    PostValidateValue.previewText.minLength,
    PostValidateValue.previewText.maxLength,
    { message: PostValidateMessage.previewText.lengthMessage }
  )
  previewText?: string;

  @ApiProperty({ description: 'Текст публикации' })
  @ValidateIf((o) => o.type === PostType.text)
  @IsOptional()
  @IsString()
  @Length(
    PostValidateValue.text.minLength, 
    PostValidateValue.text.maxLength, 
    { message: PostValidateMessage.text.lengthMessage }
  )
  text?: string;

  @ApiProperty({ description: 'Текст цитаты' })
  @ValidateIf((o) => o.type === PostType.quote)
  @IsOptional()
  @IsString()
  @Length(
    PostValidateValue.textQuote.minLength, 
    PostValidateValue.textQuote.maxLength, 
    { message: PostValidateMessage.textQuote.lengthMessage }
  )
  textQuote?: string;
  
  @ApiProperty({ description: 'Автор цитаты' })
  @ValidateIf((o) => o.type === PostType.quote)
  @IsOptional()
  @IsString()
  @Length(
    PostValidateValue.authorQuote.minLength, 
    PostValidateValue.authorQuote.maxLength, 
    { message: PostValidateMessage.authorQuote.lengthMessage }
  )
  authorQuote?: string;

  @ApiProperty({ description: 'Фотография' })
  @ValidateIf((o) => o.type === PostType.photo)
  @IsOptional()
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
