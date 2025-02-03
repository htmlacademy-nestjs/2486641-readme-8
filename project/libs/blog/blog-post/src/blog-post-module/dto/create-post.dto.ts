import { ApiProperty } from "@nestjs/swagger";
import { PostType } from "@project/core";
import { ArrayMaxSize, IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl, Length, MaxLength, ValidateIf } from "class-validator";
import { PostFieldDescription, PostValidateMessage, PostValidateValue } from "../blog-post.constant";
import { TagsArray } from "./tags-array-validator";
import { Transform } from "class-transformer";

export class CreatePostDto {
  @ApiProperty(PostFieldDescription.type)
  @IsEnum(PostType)
  @IsNotEmpty()
  type: PostType;

  @ApiProperty({...PostFieldDescription.tags, type: 'array'})
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
  @Transform(({ value }) => {
    let tags: string[];
    if ((typeof value) === 'string') {
      tags = value.split(',');
    } else {
      tags = value;
    }
    const uniq: Set<string> = new Set(tags);
    return Array.from(uniq).map((item) => item.toLowerCase());
  }) 
  @TagsArray()
  tags?: string[];

  @IsMongoId()
  userId: string;

  @ApiProperty(PostFieldDescription.titleVideo)
  @ValidateIf((o) => o.type === PostType.video)
  @Length(
    PostValidateValue.titleVideo.minLength,
    PostValidateValue.titleVideo.maxLength,
    { message: PostValidateMessage.titleVideo.lengthMessage }
  )
  titleVideo?: string;

  @ApiProperty(PostFieldDescription.urlVideo)
  @ValidateIf((o) => o.type === PostType.video)
  @IsUrl()
  urlVideo?: string;

  @ApiProperty(PostFieldDescription.titleText)
  @ValidateIf((o) => o.type === PostType.text)
  @Length(
    PostValidateValue.titleText.minLength,
    PostValidateValue.titleText.maxLength,
    { message: PostValidateMessage.titleText.lengthMessage }
  )
  titleText?: string;

  @ApiProperty(PostFieldDescription.previewText)
  @ValidateIf((o) => o.type === PostType.text)
  @Length(
    PostValidateValue.previewText.minLength,
    PostValidateValue.previewText.maxLength,
    { message: PostValidateMessage.previewText.lengthMessage }
  )
  previewText?: string;

  @ApiProperty(PostFieldDescription.text)
  @ValidateIf((o) => o.type === PostType.text)
  @IsNotEmpty()
  @IsString()
  @Length(
    PostValidateValue.text.minLength, 
    PostValidateValue.text.maxLength, 
    { message: PostValidateMessage.text.lengthMessage }
  )
  text?: string;

  @ApiProperty(PostFieldDescription.textQuote)
  @ValidateIf((o) => o.type === PostType.quote)
  @IsString()
  @Length(
    PostValidateValue.textQuote.minLength, 
    PostValidateValue.textQuote.maxLength, 
    { message: PostValidateMessage.textQuote.lengthMessage }
  )
  textQuote?: string;
  
  @ApiProperty(PostFieldDescription.authorQuote)
  @ValidateIf((o) => o.type === PostType.quote)
  @IsString()
  @Length(
    PostValidateValue.authorQuote.minLength, 
    PostValidateValue.authorQuote.maxLength, 
    { message: PostValidateMessage.authorQuote.lengthMessage }
  )
  authorQuote?: string;

  @ApiProperty(PostFieldDescription.urlPhoto)
  @ValidateIf((o) => o.type === PostType.photo)
  @IsString()
  urlPhoto?: string;

  @ApiProperty(PostFieldDescription.urlLink)
  @ValidateIf((o) => o.type === PostType.link)
  @IsUrl()
  urlLink?: string;

  @ApiProperty(PostFieldDescription.descriptionLink)
  @ValidateIf((o) => o.type === PostType.link)
  @IsOptional()
  @IsString()
  @MaxLength(
    PostValidateValue.descriptionLink.maxLength, 
    { message: PostValidateMessage.descriptionLink.lengthMessage }
  )
  descriptionLink?: string;
}
